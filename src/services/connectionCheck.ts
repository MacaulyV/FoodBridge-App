import api from './api';
import { API_URL } from './api';

/**
 * Verifica se o aplicativo consegue se comunicar com a API
 * @returns Objeto com informações sobre a conexão
 */
export async function checkApiConnection(): Promise<{
  success: boolean;
  message: string;
  url?: string;
  ping?: number;
  environment?: 'development' | 'production';
}> {
  const startTime = Date.now();
  const environment = __DEV__ ? 'development' : 'production';
  
  try {
    // Tenta fazer uma requisição para o endpoint de login
    // Usamos o endpoint específico ao invés da raiz para validar que é a API correta
    const response = await api.get('/users/login');
    const endTime = Date.now();
    const pingTime = endTime - startTime;
    
    return {
      success: true,
      message: 'Conexão com a API estabelecida com sucesso',
      url: API_URL,
      ping: pingTime,
      environment
    };
  } catch (error: any) {
    // Se houve erro 404 ou 405, pode ser porque GET não é permitido nessa rota
    // mas ainda significa que a API está acessível
    if (error.response && (error.response.status === 404 || error.response.status === 405)) {
      const endTime = Date.now();
      const pingTime = endTime - startTime;
      
      return {
        success: true,
        message: 'Conexão com a API estabelecida com sucesso (login requer POST)',
        url: API_URL,
        ping: pingTime,
        environment
      };
    }
    
    // Se a API não tiver o endpoint de login, podemos tentar outro endpoint
    try {
      // Tenta uma rota alternativa (health check é comum em APIs)
      const response = await api.get('/health');
      const endTime = Date.now();
      const pingTime = endTime - startTime;
      
      return {
        success: true,
        message: 'Conexão com a API estabelecida com sucesso (via /health)',
        url: API_URL,
        ping: pingTime,
        environment
      };
    } catch (innerError: any) {
      // Verifica se consegue ao menos receber alguma resposta HTTP
      try {
        // Tenta a raiz da API
        const response = await api.get('/');
        const endTime = Date.now();
        const pingTime = endTime - startTime;
        
        return {
          success: true,
          message: 'Conexão com a API estabelecida com sucesso (via raiz)',
          url: API_URL,
          ping: pingTime,
          environment
        };
      } catch (rootError: any) {
        // Falha na verificação de conectividade
        let errorMessage = `Não foi possível conectar à API (${environment})`;
        
        // Detalhes do erro para ajudar no diagnóstico
        if (rootError.response) {
          // Recebeu resposta, mas com erro
          errorMessage = `API respondeu com erro ${rootError.response.status} (${environment})`;
        } else if (rootError.request) {
          // Não recebeu resposta
          errorMessage = `API não respondeu à requisição (${environment})`;
          
          // Fornecer mais detalhes em ambiente de desenvolvimento
          if (environment === 'development') {
            errorMessage += '\nVerifique se:\n- A API está rodando\n- A URL está correta\n- O dispositivo está na mesma rede';
          }
        }
        
        return {
          success: false,
          message: errorMessage,
          url: API_URL,
          environment
        };
      }
    }
  }
}

/**
 * Teste rápido para verificar se um endereço de rede está acessível
 * @param host Endereço IP ou hostname
 * @param port Porta (opcional)
 * @returns Objeto com resultado do teste de conexão
 */
export async function pingHost(host: string, port?: number): Promise<{
  success: boolean;
  message: string;
  time?: number;
}> {
  const startTime = Date.now();
  let url = host;
  
  // Se a porta foi informada, inclui na URL
  if (port) {
    // Verifica se a URL já inclui protocolo
    if (!url.startsWith('http')) {
      url = `http://${host}:${port}`;
    } else {
      // Extrai protocolo e domínio para adicionar a porta
      const urlParts = url.split('://');
      const protocol = urlParts[0];
      const domain = urlParts[1].split('/')[0];
      url = `${protocol}://${domain}:${port}`;
    }
  }
  
  try {
    // Tenta fazer uma requisição simples para verificar se o host está acessível
    await fetch(url, {
      method: 'HEAD',
      mode: 'no-cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow'
    });
    
    const endTime = Date.now();
    const pingTime = endTime - startTime;
    
    return {
      success: true,
      message: `Host ${url} está acessível`,
      time: pingTime
    };
  } catch (error) {
    return {
      success: false,
      message: `Host ${url} não está acessível`
    };
  }
} 