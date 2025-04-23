# FoodBridge 🍎 🔄 🥫

![Status do Projeto](https://img.shields.io/badge/Status-Em%20Desenvolvimento-green)
![Tecnologia](https://img.shields.io/badge/React%20Native-0.76.9-blue)
![Expo](https://img.shields.io/badge/Expo-52.0.46-blue)

## 📱 Visão Geral

FoodBridge é uma aplicação móvel desenvolvida em React Native com Expo que tem como objetivo conectar doadores de alimentos com pessoas ou organizações que necessitam destes recursos, criando uma **ponte** (bridge) entre o excesso e a escassez alimentar.

O aplicativo permite que usuários de diferentes perfis (pessoas físicas, jurídicas e ONGs) possam interagir em um ecossistema de doação de alimentos, promovendo a redução do desperdício e auxiliando na segurança alimentar de comunidades em situação de vulnerabilidade.

## 📑 Sumário

- [Conceito e Propósito](#-conceito-e-propósito)
- [Funcionalidades Principais](#-funcionalidades-principais)
- [Arquitetura do Projeto](#-arquitetura-do-projeto)
- [Fluxo de Navegação](#-fluxo-de-navegação)
- [Estrutura de Pastas](#-estrutura-de-pastas)
- [Principais Componentes](#-principais-componentes)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Armazenamento e Persistência](#-armazenamento-e-persistência)
- [API e Comunicação Externa](#-api-e-comunicação-externa)
- [Validações e Alertas](#-validações-e-alertas)
- [Considerações de UX/UI](#-considerações-de-uxui)
- [Instalação e Execução](#-instalação-e-execução)
- [Planos Futuros](#-planos-futuros)

## 🎯 Conceito e Propósito

### O Problema Social

O Brasil enfrenta dois problemas contraditórios: o desperdício massivo de alimentos (cerca de 27 milhões de toneladas por ano) e a fome que afeta mais de 33 milhões de pessoas. O FoodBridge nasceu da necessidade de criar um canal direto, eficiente e acessível para conectar quem tem excedente de alimentos com quem precisa.

### Solução Proposta

FoodBridge funciona como uma plataforma de intermediação onde:

- **Doadores** (pessoas físicas e jurídicas) podem cadastrar alimentos disponíveis para doação
- **Receptores** (principalmente ONGs) podem visualizar, solicitar e gerenciar o recebimento dessas doações
- **Todo o processo** é monitorado, desde o cadastro até a confirmação de entrega

A aplicação foi projetada para ser intuitiva, leve e funcionar mesmo em ambientes com conectividade limitada, possibilitando que comunidades diversas possam utilizá-la.

## 🛠 Funcionalidades Principais

### 1. Onboarding e Cadastro
- **Telas de boas-vindas** com animações e apresentação do conceito
- **Escolha de perfil**: Doador (Pessoa Física/Jurídica) ou Receptor (ONG)
- **Cadastro personalizado** de acordo com o tipo de perfil selecionado
- **Login seguro** com validação e persistência de sessão

### 2. Para Doadores
- **Cadastro de doações** com:
  - Nome e descrição do alimento
  - Data de validade
  - Localização (bairro/distrito)
  - Horário preferencial para retirada
  - Upload de imagens
- **Gerenciamento de doações** com visualização de status:
  - Aguardando (doação publicada, mas sem solicitações)
  - Aceita (doação que está em processo de retirada)
  - Recusada (doação que foi cancelada)
- **Histórico de doações** com todas as transações realizadas

### 3. Para Receptores (ONGs)
- **Feed de doações disponíveis** com filtros por região e tipo de alimento
- **Solicitação de doações** com sistema de aprovação
- **Acompanhamento de solicitações** com diferentes status
- **Histórico de recebimentos** para controle interno

### 4. Funcionalidades Comuns
- **Edição de perfil** com upload de imagem e dados de contato
- **Contador dinâmico** de doações realizadas/recebidas
- **Visualização aproximada de localização** através de botão de geolocalização
- **Sistema de notificações** sobre novos status

## 🏗️ Arquitetura do Projeto

O FoodBridge foi construído utilizando o framework React Native com Expo, seguindo os padrões da comunidade e as melhores práticas de desenvolvimento mobile. A arquitetura do projeto foi planejada para garantir:

- **Desacoplamento de componentes**
- **Reusabilidade de código**
- **Manutenibilidade a longo prazo**
- **Performance otimizada para dispositivos diversos**

### Stack Tecnológica

- **Frontend**: React Native 0.76.9
- **Framework**: Expo SDK 52
- **Gerenciamento de Estado**: React Hooks (useState, useEffect, useContext)
- **Navegação**: React Navigation 7.x
- **Persistência Local**: AsyncStorage
- **Requisições HTTP**: Axios
- **Estilização**: StyleSheet nativo + bibliotecas de UI (Expo LinearGradient, etc.)
- **Formulários**: Validação personalizada
- **Animações**: Animated API + react-native-animatable

## 🧭 Fluxo de Navegação

O fluxo de navegação do FoodBridge é baseado em uma estrutura hierárquica que se adapta ao tipo de usuário:

### Fluxo Inicial (Comum para todos)
1. **Splash Screen** → carregamento inicial da aplicação
2. **Welcome** → tela de boas-vindas com animações e conceito
3. **HowItWorks** → explicação sobre o funcionamento do app
4. **ChooseProfile** → seleção entre doador ou receptor
5. **Register/Login** → cadastro ou acesso à conta

### Detecção de Estado do Usuário
O aplicativo identifica automaticamente:
- Se o usuário já viu as telas de introdução (via `AsyncStorage` com a chave `@FoodBridge:onboarded`)
- Se o usuário já está logado (via `AsyncStorage` com a chave `@FoodBridge:userData`)
- Qual o tipo de perfil do usuário para direcioná-lo à tela correta

### Navegação para Doadores
- **MyDonations** → tela principal com lista de doações realizadas
- **DonateFood** → formulário para cadastro de novas doações
- **Profile** → visualização e edição de dados do perfil

### Navegação para Receptores
- **DonationsFeed** → tela principal com lista de doações disponíveis
- **MyRequests** → histórico de solicitações realizadas
- **Profile** → visualização e edição de dados do perfil

### Sistema de Navegação
- **Stack Navigator**: para o fluxo principal de telas
- **Header Personalizado**: com componentes personalizados para cada tela
- **Animações de Transição**: para melhorar a experiência do usuário

## 📁 Estrutura de Pastas

O projeto segue uma estrutura organizada por domínio:

```
/src
├── @types/             # Definições de tipos TypeScript
├── components/         # Componentes reutilizáveis
├── hooks/              # Custom hooks
├── navigation/         # Configuração de navegação
│   └── AppNavigator.tsx
├── screens/            # Telas da aplicação
│   ├── Welcome/
│   ├── HowItWorks/
│   ├── ChooseProfile/
│   ├── Register/
│   ├── Login/
│   ├── Profile/
│   ├── MyDonations/
│   ├── MyRequests/
│   ├── DonateFood/
│   ├── Team/
│   └── DonationsFeed/
├── services/           # Serviços e integrações
│   ├── api.ts
│   ├── authService.ts
│   ├── donationService.ts
│   ├── userService.ts
│   ├── tokenService.ts
│   ├── connectionCheck.ts
│   └── ProfileImageService.ts
├── theme/              # Estilos, cores e design system
└── utils/              # Utilitários e funções auxiliares
```

## 🧩 Principais Componentes

### Telas

#### Welcome
A tela de boas-vindas é rica em animações e elementos visuais que apresentam o conceito do FoodBridge. Utiliza o sistema de partículas customizado e transições fluidas.

```javascript
// Trecho de WelcomeScreen.tsx
const WelcomeScreen: React.FC<Props> = ({ navigation, route }) => {
  // Hooks para gerenciar animações e partículas
  const animValues = useAnimationValues();
  const { 
    backgroundParticles,
    // ...outras propriedades
  } = useParticleAnimation();
  
  // ...resto do código
```

#### ChooseProfile
Permite que o usuário selecione seu tipo de perfil (doador ou receptor) com cards interativos e animações responsivas:

```javascript
// Trecho de ChooseProfileScreen.tsx
<ProfileOptionsContainer
  containerOpacity={animValues.containerOpacity}
  containerTranslateY={animValues.containerTranslateY}
  donateOptionOpacity={animValues.donateOptionOpacity}
  donateOptionScale={animValues.donateOptionScale}
  receiveOptionOpacity={animValues.receiveOptionOpacity}
  receiveOptionScale={animValues.receiveOptionScale}
  onSelectDonate={handleDonate}
  onSelectReceive={handleReceive}
/>
```

#### MyDonations
Lista todas as doações realizadas pelo usuário com indicadores de status e opções de gerenciamento.

#### DonationsFeed
Exibe todas as doações disponíveis para ONGs solicitarem, com filtros e opções de ordenação.

### Serviços

#### userService
Gerencia todas as operações relacionadas ao usuário, incluindo:
- Persistência de dados no AsyncStorage
- Atualização de perfil
- Controle de estado de onboarding

```typescript
// Exemplo de função no userService.ts
export const getUserData = async (): Promise<UserData | null> => {
  try {
    const userData = await AsyncStorage.getItem(USER_DATA_KEY);
    if (!userData) {
      console.log('ℹ️ [STORAGE] Nenhum dado de usuário encontrado');
      return null;
    }
    
    console.log('✅ [STORAGE] Dados do usuário recuperados com sucesso');
    return JSON.parse(userData);
  } catch (error) {
    console.error('❌ [STORAGE] Erro ao recuperar dados do usuário:', error);
    return null;
  }
};
```

#### donationService
Gerencia as operações de doação:
- Criação de novas doações
- Listagem de doações do usuário
- Atualização e exclusão de doações

```typescript
// Exemplo de função no donationService.ts
export const createDonation = async (data: {
  foodName: string;
  expirationDate: Date | null;
  description: string;
  district: string;
  preferredPickupTime: string;
  termsAccepted: boolean;
  images: string[];
}): Promise<any> => {
  // Implementação...
};
```

## 💾 Armazenamento e Persistência

O FoodBridge utiliza diversas estratégias para garantir a persistência de dados:

### AsyncStorage
Utilizado para armazenar dados localmente:
- Dados do usuário logado
- Token de autenticação
- Estado de onboarding
- Imagem de perfil em base64

### API Externa
- Todas as doações são sincronizadas com o backend
- Usuários são cadastrados e autenticados via API
- Imagens de doações são armazenadas no servidor

### Gerenciamento de Cache
- Implementação de estratégias para funcionamento offline parcial
- Sincronização quando a conexão é reestabelecida

## 🌐 API e Comunicação Externa

A comunicação com o backend é feita via REST API utilizando o Axios:

```typescript
// Configuração do Axios em api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.foodbridge.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

export default api;
```

### Endpoints Principais
- `/users` - Gestão de usuários
- `/donations` - CRUD de doações
- `/auth` - Autenticação e renovação de tokens

### Interceptores
O app implementa interceptores para:
- Adicionar tokens de autenticação
- Tratar erros de requisição
- Verificar conectividade

## ⚠️ Validações e Alertas

O FoodBridge possui um sistema robusto de validações:

### Validação de Formulários
- Validação de campos obrigatórios
- Validação de formato de email
- Validação de senhas (critérios de segurança)
- Validação de data de validade de alimentos

### Sistema de Alertas
- Feedback visual em tempo real
- Mensagens de erro personalizadas
- Confirmações de ações importantes

## 🎨 Considerações de UX/UI

### Paleta de Cores
- Verde (#4CAF50) - Representa sustentabilidade e esperança
- Laranja (#FF7F50) - Representa alimento e energia
- Gradientes entre essas cores para elementos principais

### Componentes Visuais
- Cards com status indicados por cores
- Botões com feedback tátil e visual
- Animações suaves para transições
- Sistema de partículas para elementos decorativos

### Acessibilidade
- Contraste adequado para leitura
- Tamanhos de fonte ajustáveis
- Feedback tátil para ações importantes

## 📲 Instalação e Execução

```bash
# Clone o repositório
git clone https://github.com/usuario/foodbridge.git

# Entre na pasta do projeto
cd foodbridge

# Instale as dependências
npm install

# Execute o projeto
npm start
```

### Requisitos
- Node.js 14.x ou superior
- Expo CLI
- Ambiente Android/iOS configurado

## 🔮 Planos Futuros

### Funcionalidades Planejadas
- Integração com mapas para visualização de doações próximas
- Sistema de gamificação para incentivar doações
- Chat interno entre doador e receptor
- Relatórios estatísticos sobre impacto social

### Melhorias Técnicas
- Migração para o novo Expo Router
- Implementação de testes automatizados
- Otimização de performance para dispositivos de entrada

---

Desenvolvido com 💚🧡 pelo time FoodBridge | 2023 