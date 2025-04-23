// src/controllers/donationController.js
const fs            = require('fs');
const path          = require('path');
const generateId    = require('../utils/idGenerator');
const donationModel = require('../models/donationModel');

// Converte "img1.jpg,img2.png" num array de URLs completas
function formatImageUrls(req, raw) {
    if (!raw) return [];
    const files = raw.split(',').filter(Boolean);
    const base  = `${req.protocol}://${req.get('host')}/uploads`;
    return files.map(f => `${base}/${f}`);
}

async function createDonation(req, res, next) {
    try {
        const {
            nome_alimento,
            validade,
            descricao,
            bairro_ou_distrito,
            horario_preferido,
            termos,
            user_id
        } = req.body;

        const imagens = req.files?.map(f => f.filename) || [];
        const id      = generateId();

        await donationModel.createDonation({
            id,
            nome_alimento,
            validade,
            descricao,
            bairro: bairro_ou_distrito,
            horario_preferido,
            termos,
            user_id,
            imagens_urls: imagens
        });

        res.status(201).json({ id });
    } catch (err) {
        next(err);
    }
}

async function getAllDonations(req, res, next) {
    try {
        const list = await donationModel.getAllDonations();
        const formatted = list.map(d => ({
            ...d,
            imagens_urls: formatImageUrls(req, d.IMAGENS_URLS)
        }));
        res.json(formatted);
    } catch (err) {
        next(err);
    }
}

async function getDonationById(req, res, next) {
    try {
        const d = await donationModel.getDonationById(req.params.id);
        if (!d) return res.status(404).json({ error: 'Doação não encontrada' });

        res.json({
            ...d,
            imagens_urls: formatImageUrls(req, d.IMAGENS_URLS)
        });
    } catch (err) {
        next(err);
    }
}

async function updateDonation(req, res, next) {
    try {
        const data = { ...req.body };
        const donationId = req.params.id;
        
        // Buscamos a doação atual para obter suas imagens
        const donation = await donationModel.getDonationById(donationId);
        if (!donation) {
            return res.status(404).json({ error: 'Doação não encontrada' });
        }
        
        // Obtém a lista de imagens atuais
        const imagensAtuais = (donation.IMAGENS_URLS || '').split(',').filter(Boolean);
        let imagensFinais = [];
        
        // CASO 1: Se temos o parâmetro imagens_manter, usamos ele para determinar 
        // quais imagens existentes manter
        if (data.imagens_manter) {
            // Converte string com lista separada por vírgulas em array
            const imagensManter = data.imagens_manter.split(',').map(img => img.trim()).filter(Boolean);
            
            // Adiciona à lista final apenas as imagens que existem e estão na lista de manter
            imagensFinais = imagensAtuais.filter(img => imagensManter.includes(img));
            
            // Remove fisicamente as imagens que não serão mantidas
            const imagensRemover = imagensAtuais.filter(img => !imagensManter.includes(img));
            for (const filename of imagensRemover) {
                const filePath = path.resolve(__dirname, '../../uploads', filename);
                if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
            }
        }
        // CASO 2: Se não temos imagens_manter, removemos todas as imagens existentes
        else {
            // Remove fisicamente todas as imagens atuais
            for (const filename of imagensAtuais) {
                const filePath = path.resolve(__dirname, '../../uploads', filename);
                if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
            }
        }
        
        // Adiciona novas imagens enviadas (se houver)
        if (req.files && req.files.length > 0) {
            const novasImagens = req.files.map(f => f.filename);
            imagensFinais = [...imagensFinais, ...novasImagens];
        }
        
        // Atualiza as imagens_urls com a lista final de imagens
        data.imagens_urls = imagensFinais;
        
        // Converte o array em string para salvar no banco
        if (data.imagens_urls) {
            data.imagens_urls = Array.isArray(data.imagens_urls)
                ? data.imagens_urls.join(',')
                : data.imagens_urls;
        }
        
        // Remove campo de controle que não deve ir para o banco
        delete data.imagens_manter;
        
        await donationModel.updateDonation(donationId, data);
        res.json({ 
            message: 'Doação atualizada', 
            imagens_atualizadas: imagensFinais 
        });
    } catch (err) {
        next(err);
    }
}

async function deleteDonation(req, res, next) {
    try {
        // 1) busca urls pra apagar
        const d = await donationModel.getDonationById(req.params.id);
        if (!d) return res.status(404).json({ error: 'Doação não encontrada' });

        const files = (d.IMAGENS_URLS || '').split(',').filter(Boolean);
        for (const filename of files) {
            const filePath = path.resolve(__dirname, '../../uploads', filename);
            if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        }

        // 2) apaga registro
        await donationModel.deleteDonation(req.params.id);
        res.json({ message: 'Doação e imagens removidas' });
    } catch (err) {
        next(err);
    }
}

// mini‑HTML com todas as imagens
async function getGallery(req, res, next) {
    try {
        const d = await donationModel.getDonationById(req.params.id);
        if (!d) return res.status(404).send('Doação não encontrada');

        const urls = formatImageUrls(req, d.IMAGENS_URLS);
        const imgs = urls
            .map(u => `<img src="${u}" style="max-width:200px; margin:5px;" />`)
            .join('');

        res.send(`
      <html>
        <head><title>Galeria: ${req.params.id}</title></head>
        <body>
          <h1>Galeria da Doação ${req.params.id}</h1>
          ${imgs || '<p>Sem imagens.</p>'}
        </body>
      </html>
    `);
    } catch (err) {
        next(err);
    }
}

async function getDonationsByUserId(req, res, next) {
    try {
        const userId = req.params.userId;
        const donations = await donationModel.getDonationsByUserId(userId);
        
        const formatted = donations.map(d => ({
            ...d,
            imagens_urls: formatImageUrls(req, d.IMAGENS_URLS)
        }));
        
        res.json(formatted);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    createDonation,
    getAllDonations,
    getDonationById,
    updateDonation,
    deleteDonation,
    getGallery,
    getDonationsByUserId
};

