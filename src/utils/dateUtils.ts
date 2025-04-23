/**
 * Verifica se uma data de validade está expirada em relação à data atual
 * @param expirationDateStr Data de validade no formato ISO String
 * @returns true se a data estiver expirada, false caso contrário
 */
export const isExpired = (expirationDateStr: string): boolean => {
  try {
    const currentDate = new Date();
    const expirationDate = new Date(expirationDateStr);
    
    // Remover o horário para comparação apenas de datas
    currentDate.setHours(0, 0, 0, 0);
    expirationDate.setHours(0, 0, 0, 0);
    
    return expirationDate < currentDate;
  } catch (error) {
    console.error('❌ Erro ao verificar data de validade:', error);
    return false; // Se houver erro, assume que não está expirado por segurança
  }
};

/**
 * Formata uma data para o formato brasileiro DD/MM/YYYY
 * @param dateStr Data no formato ISO String
 * @returns Data formatada
 */
export const formatDateBR = (dateStr: string): string => {
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  } catch (error) {
    console.error('❌ Erro ao formatar data:', error);
    return 'Data inválida';
  }
};

/**
 * Calcula a diferença em dias entre duas datas
 * @param dateA Primeira data no formato ISO String
 * @param dateB Segunda data no formato ISO String (opcional, usa a data atual se não informada)
 * @returns Número de dias de diferença (positivo se dateA > dateB, negativo se dateA < dateB)
 */
export const daysDifference = (dateA: string, dateB?: string): number => {
  try {
    const firstDate = new Date(dateA);
    const secondDate = dateB ? new Date(dateB) : new Date();
    
    // Remover o horário para comparação apenas de datas
    firstDate.setHours(0, 0, 0, 0);
    secondDate.setHours(0, 0, 0, 0);
    
    // Calcular diferença em milissegundos e converter para dias
    const diffTime = firstDate.getTime() - secondDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  } catch (error) {
    console.error('❌ Erro ao calcular diferença de datas:', error);
    return 0;
  }
};

/**
 * Retorna um texto formatado indicando quanto tempo falta para expirar ou há quanto tempo expirou
 * @param expirationDateStr Data de validade no formato ISO String
 * @returns Texto formatado sobre o tempo restante ou expirado
 */
export const getExpirationText = (expirationDateStr: string): string => {
  try {
    const days = daysDifference(expirationDateStr);
    
    if (days > 0) {
      // Ainda não expirou
      if (days === 1) {
        return 'Expira amanhã';
      } else if (days <= 7) {
        return `Expira em ${days} dias`;
      } else {
        return `Válido até ${formatDateBR(expirationDateStr)}`;
      }
    } else if (days === 0) {
      return 'Expira hoje';
    } else {
      // Já expirou
      const absDays = Math.abs(days);
      if (absDays === 1) {
        return 'Expirou ontem';
      } else {
        return `Expirou há ${absDays} dias`;
      }
    }
  } catch (error) {
    console.error('❌ Erro ao calcular texto de expiração:', error);
    return 'Data inválida';
  }
}; 