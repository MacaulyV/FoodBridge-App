import api from './api';
import { getUserData } from './userService';

/**
 * Interface para os dados de doação a serem enviados para a API
 */
interface DonationData {
  nome_alimento: string;
  validade: string; // formato: YYYY-MM-DD
  descricao?: string;
  bairro_ou_distrito: string;
  horario_preferido?: string;
  termos: boolean;
  user_id: string;
  imagens?: File[] | string[];
}

/**
 * Cria uma nova doação através da API
 */
export const createDonation = async (data: {
  foodName: string;
  expirationDate: Date | null;
  description: string;
  district: string;
  preferredPickupTime: string;
  termsAccepted: boolean;
  images: string[];
}): Promise<any> => {
  try {
    // Obter ID do usuário logado do AsyncStorage
    const userData = await getUserData();
    
    if (!userData || !userData.id) {
      throw new Error('Usuário não está logado ou não possui ID');
    }
    
    // Formatar data de validade para YYYY-MM-DD
    let formattedDate = '';
    if (data.expirationDate) {
      const date = new Date(data.expirationDate);
      formattedDate = date.toISOString().split('T')[0];
    }
    
    // Mapear os dados do formulário para o formato esperado pela API
    const donationData: DonationData = {
      nome_alimento: data.foodName,
      validade: formattedDate,
      descricao: data.description || '',
      bairro_ou_distrito: data.district,
      horario_preferido: data.preferredPickupTime || '',
      termos: data.termsAccepted,
      user_id: userData.id,
      imagens: data.images || []
    };
    
    if (__DEV__) console.log('📤 [API] Enviando dados de doação:', donationData);
    
    // Criar a requisição multipart/form-data para suportar upload de imagens
    const formData = new FormData();
    
    // Adicionar os dados de texto
    formData.append('nome_alimento', donationData.nome_alimento);
    formData.append('validade', donationData.validade);
    formData.append('descricao', donationData.descricao);
    formData.append('bairro_ou_distrito', donationData.bairro_ou_distrito);
    formData.append('horario_preferido', donationData.horario_preferido);
    formData.append('termos', donationData.termos ? 'Sim' : 'Não');
    formData.append('user_id', donationData.user_id);
    
    // Adicionar as imagens se existirem
    if (donationData.imagens && donationData.imagens.length > 0) {
      donationData.imagens.forEach((image, index) => {
        // Se a imagem for um caminho de URI (string)
        if (typeof image === 'string') {
          // Extrair o nome do arquivo do caminho URI
          const uriParts = image.split('/');
          const fileName = uriParts[uriParts.length - 1];
          
          // Criar um objeto de arquivo para o FormData
          const file = {
            uri: image,
            type: 'image/jpeg', // Assumindo que é uma imagem JPEG
            name: fileName,
          };
          
          formData.append('imagens', file as any);
        } else {
          // Se for um objeto File (web)
          formData.append('imagens', image);
        }
      });
    }
    
    // Fazer a requisição POST com multipart/form-data
    const response = await api.post('/donations', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    if (__DEV__) console.log('📥 [API] Doação criada com sucesso:', response.data);
    
    return response.data;
  } catch (error: any) {
    console.error('❌ [API] Erro ao criar doação:', error);
    
    // Extrair informações mais detalhadas do erro para retornar
    if (error.response) {
      console.error('❌ [API] Detalhes do erro:', error.response.data);
      throw {
        message: error.response.data.message || 'Erro ao criar doação',
        statusCode: error.response.status,
        details: error.response.data
      };
    }
    
    throw error;
  }
};

/**
 * Carrega as doações do usuário atual
 */
export const getUserDonations = async (): Promise<any[]> => {
  try {
    // Obter ID do usuário logado do AsyncStorage
    const userData = await getUserData();
    
    if (!userData || !userData.id) {
      throw new Error('Usuário não está logado ou não possui ID');
    }
    
    // Buscar doações do usuário
    const response = await api.get(`/donations/user/${userData.id}`);
    
    if (__DEV__) console.log('📥 [API] Doações do usuário carregadas:', response.data);
    
    return response.data;
  } catch (error: any) {
    console.error('❌ [API] Erro ao carregar doações:', error);
    
    if (error.response) {
      console.error('❌ [API] Detalhes do erro:', error.response.data);
    }
    
    return [];
  }
};

/**
 * Carrega todas as doações disponíveis
 */
export const getAllDonations = async (): Promise<any[]> => {
  try {
    const response = await api.get('/donations');
    
    if (__DEV__) console.log('📥 [API] Todas as doações carregadas:', response.data);
    
    return response.data;
  } catch (error: any) {
    console.error('❌ [API] Erro ao carregar todas as doações:', error);
    
    if (error.response) {
      console.error('❌ [API] Detalhes do erro:', error.response.data);
    }
    
    return [];
  }
};

/**
 * Deleta uma doação específica
 */
export const deleteDonation = async (donationId: string): Promise<any> => {
  try {
    const response = await api.delete(`/donations/${donationId}`);
    
    if (__DEV__) console.log('🗑️ [API] Doação deletada com sucesso:', donationId);
    
    return response.data;
  } catch (error: any) {
    console.error('❌ [API] Erro ao deletar doação:', error);
    
    if (error.response) {
      console.error('❌ [API] Detalhes do erro:', error.response.data);
      throw {
        message: error.response.data.message || 'Erro ao deletar doação',
        statusCode: error.response.status,
        details: error.response.data
      };
    }
    
    throw error;
  }
};

/**
 * Atualiza uma doação existente através da API
 */
export const updateDonation = async (donationId: string, data: {
  foodName: string;
  expirationDate: Date | null;
  description: string;
  district: string;
  preferredPickupTime: string;
  termsAccepted: boolean;
  images: string[];
  imagesToDelete?: string[]; // IDs das imagens a serem removidas
}): Promise<any> => {
  try {
    // Formatar data de validade para YYYY-MM-DD
    let formattedDate = '';
    if (data.expirationDate) {
      const date = new Date(data.expirationDate);
      formattedDate = date.toISOString().split('T')[0];
    }
    
    if (__DEV__) console.log(`📤 [API] Atualizando doação ${donationId}`);
    
    // Verificar se há imagens que queremos MANTER (imagens existentes que não estão marcadas para exclusão)
    const currentImages = data.images.filter(img => img.startsWith('http'));
    console.log('📷 [API] Total de imagens atuais:', currentImages.length);
    
    // Extrair apenas os nomes dos arquivos das URLs que queremos manter
    const imagesToKeep = currentImages.map(url => {
      // Extrair o nome do arquivo da URL
      const parts = url.split('/');
      return parts[parts.length - 1];
    });
    
    console.log('📌 [API] Imagens para manter:', imagesToKeep);
    
    // Verificar se há novas imagens para adicionar
    const newImages = data.images.filter(img => !img.startsWith('http'));
    console.log('➕ [API] Novas imagens para adicionar:', newImages.length);
    
    // Criar FormData para envio
    const formData = new FormData();
    
    // Adicionar os dados básicos
    formData.append('nome_alimento', data.foodName);
    formData.append('validade', formattedDate);
    formData.append('descricao', data.description || '');
    formData.append('bairro_ou_distrito', data.district);
    formData.append('horario_preferido', data.preferredPickupTime || '');
    formData.append('termos', data.termsAccepted ? 'Sim' : 'Não');
    
    // Enviar a lista de nomes de arquivos que queremos manter APENAS se houver algum para manter
    if (imagesToKeep.length > 0) {
      // A API espera um string com os nomes separados por vírgula
      const imagesToKeepString = imagesToKeep.join(',');
      formData.append('imagens_manter', imagesToKeepString);
      console.log('📋 [API] Enviando imagens_manter:', imagesToKeepString);
    } else {
      // Se não há imagens para manter, NÃO enviamos o campo (a API não aceita vazio)
      console.log('🧹 [API] Não enviando imagens_manter (substitui todas as imagens)');
    }
    
    // Adicionar novas imagens, se houver
    if (newImages.length > 0) {
      console.log(`📸 [API] Adicionando ${newImages.length} novas imagens`);
      
      newImages.forEach((image, index) => {
        // Extrair o nome do arquivo do caminho URI
        const uriParts = image.split('/');
        const fileName = uriParts[uriParts.length - 1];
        
        // Criar um objeto de arquivo para o FormData
        const file = {
          uri: image,
          type: 'image/jpeg', // Assumindo que é uma imagem JPEG
          name: fileName,
        };
        
        formData.append('imagens', file as any);
      });
    }
    
    // Mostrar todos os campos que estamos enviando para debug
    if (__DEV__) {
      console.log('📦 [API] Enviando dados para atualização:');
      for (const pair of (formData as any)._parts) {
        console.log(`${pair[0]}: ${typeof pair[1] === 'object' ? '[objeto File]' : pair[1]}`);
      }
    }
    
    // Fazer a requisição PUT com todos os dados
    const response = await api.put(`/donations/${donationId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    if (__DEV__) console.log('✅ [API] Doação atualizada com sucesso:', response.data);
    
    return response.data;
  } catch (error: any) {
    console.error('❌ [API] Erro ao atualizar doação:', error);
    
    // Extrair informações mais detalhadas do erro para retornar
    if (error.response) {
      console.error('❌ [API] Detalhes do erro:', error.response.data);
      throw {
        message: error.response.data.message || 'Erro ao atualizar doação',
        statusCode: error.response.status,
        details: error.response.data
      };
    }
    
    throw error;
  }
};

/**
 * Função auxiliar para lidar com atualizações de imagens
 */
const handleImageUpdates = async (
  donationId: string, 
  images: string[], 
  imagesToDelete?: string[]
): Promise<void> => {
  // Excluir imagens se necessário
  if (imagesToDelete && imagesToDelete.length > 0) {
    try {
      console.log('🗑️ [API] Excluindo imagens:', imagesToDelete);
      
      // A API espera um array no campo image_ids
      await api.post(`/donations/${donationId}/delete-images`, {
        image_ids: imagesToDelete
      });
      
      console.log('✅ [API] Imagens excluídas com sucesso');
    } catch (error: any) {
      console.error('❌ [API] Erro ao excluir imagens:', error.response?.data || error.message);
      throw error;
    }
  }
  
  // Fazer upload de novas imagens
  const newImages = images.filter(img => !img.startsWith('http'));
  if (newImages.length > 0) {
    try {
      await uploadImages(donationId, newImages);
    } catch (error: any) {
      console.error('❌ [API] Erro ao fazer upload de imagens:', error.response?.data || error.message);
      throw error;
    }
  }
};

/**
 * Função auxiliar para fazer upload de imagens
 */
const uploadImages = async (donationId: string, images: string[]): Promise<void> => {
  console.log('📤 [API] Enviando novas imagens:', images.length);
  
  // Criar um FormData apenas para as imagens
  const formData = new FormData();
  
  // Adicionar todas as imagens novas
  images.forEach((image, index) => {
    // Extrair o nome do arquivo do caminho URI
    const uriParts = image.split('/');
    const fileName = uriParts[uriParts.length - 1];
    
    // Criar um objeto de arquivo para o FormData
    const file = {
      uri: image,
      type: 'image/jpeg', // Assumindo que é uma imagem JPEG
      name: fileName,
    };
    
    formData.append('imagens', file as any);
  });
  
  // Fazer a requisição para adicionar as imagens
  await api.post(`/donations/${donationId}/images`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  
  console.log('✅ [API] Novas imagens enviadas com sucesso');
}; 