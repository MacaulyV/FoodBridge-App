![Descrição banner](https://github.com/user-attachments/assets/eee53994-1651-4d35-9131-880c091791f8)

# 🍎 FoodBridge 🔄 🥫

---

**A ponte entre o excesso de alimentos e quem mais precisa**

---

## 📱 Visão Geral

FoodBridge é um app mobile feito em **React Native + Expo** que conecta doadores (pessoas físicas, comércios, restaurantes) a receptores (ONGs ou pessoas físicas em situação de vulnerabilidade). A ideia é simples: publicar doações de alimentos antes que estraguem e permitir que quem precisa encontre, solicite e retire esses itens rapidamente.

- **Propósito social:** reduzir o desperdício e combater a fome de forma gratuita e descentralizada.
- **Tecnologias‑chave:** React Native 0.76, Expo 52, TypeScript 5, React Navigation 7, Axios, AsyncStorage.
- **Links rápidos:**
    - 📱 **App em produção:** [foodbridge.app](https://foodbridge.app/)
    - 🌐 **API pública:** [foodbridge-api.fly.dev](https://foodbridge-api.fly.dev/)
    - 🧪 **Documentação da API (Swagger):** [https://foodbridge-api.fly.dev/api-docs](https://foodbridge-api.fly.dev/api-docs)

---

## 🗺 Navegação & Fluxo de Usuário

```
flowchart LR
    A((📲 Início)) --> B(📥 Welcome)
    B --> C(ℹ️ How It Works)
    C --> D(👥 Choose Profile)
    D -->|Doador| E(🛂 Register Donor)
    D -->|Receptor| F(🛂 Register Receiver)
    E & F --> G(🔑 Login)
    G --> H{Tipo de Perfil?}
    H -->|Doador| I(📦 My Donations)
    H -->|ONG| J(🔍 Donations Feed)
    I --> K(🍱 Donate Food)
    J --> L(📋 My Requests)
    I & J --> M(👤 Profile)
```

### Explicação rápida

| Ícone | Tela | Descrição |
| --- | --- | --- |
| 📥 | **Welcome** | Animação de boas‑vindas + skip |
| ℹ️ | **How It Works** | Mini‑tutorial interativo |
| 👥 | **Choose Profile** | Seleção entre **Doador** ou **Receptor (ONG)** |
| 🛂 | **Register / Login** | Formulário adaptável ao perfil |
| 📦 | **My Donations** | Grade de doações criadas pelo doador |
| 🍱 | **Donate Food** | Formulário completo de nova doação |
| 🔍 | **Donations Feed** | Lista pública de doações disponíveis (para ONGs) |
| 📋 | **My Requests** | Histórico e status das solicitações |
| 👤 | **Profile** | Edição de conta + estatísticas |

Navegação implementada com **React Navigation (Stack + Drawer)** e controle condicional via **AsyncStorage** (token, tipo de perfil e onboarding).

---

## 🏗 Estrutura do Projeto

```
/src
├─ @types/              # Tipos globais (rota, navegação)
├─ components/          # Componentes reutilizáveis (Footer, Alert, etc.)
├─ navigation/          # AppNavigator.tsx + configs
├─ screens/             # 1 pasta = 1 tela (Welcome, Login, ...)
│   └─ …/components/    # Sub‑componentes exclusivos da tela
├─ services/            # API, authService, donationService, …
├─ utils/               # Helpers (dateUtils, animations, …)
└─ assets/              # Ícones, imagens, fontes
```

Cada **screen** possui: `index.tsx`, `styles.ts`, `types.ts` e sub‑componentes. Os **services** encapsulam toda a conversa com a API e Save/Load no storage.

---

## 🔧 Funcionalidades do App

### 🔑 Autenticação & Perfis

- Cadastro/login seguro com token JWT.
- Três perfis: **Pessoa Física**, **Pessoa Jurídica**, **ONG**.

### 🍱 Fluxo de Doação

1. **Cadastrar alimento**: nome, descrição, validade, fotos, localização.
2. **Publicar & acompanhar status** (aguardando ▸ aceita ▸ entregue).
3. **Editar ou cancelar** enquanto não houver retirada.

### 🔍 Fluxo de Recebimento (ONG)

- **Feed filtrável** por região/tipo.
- Solicitar doação → acompanhar em **My Requests**.
- Cancelar antes da retirada, se necessário.

### 📊 Recursos Compartilhados

- **Contador** de doações realizadas/recebidas.
- **Upload de avatar** com *expo‑image‑picker* + cache local.
- **Persistência offline**: AsyncStorage faz o app funcionar mesmo sem internet e sincroniza depois.

---

## 🌐 Integração com API

Instância Axios configurada em `services/api.ts`:

```
const api = axios.create({
  baseURL: 'https://foodbridge-api.fly.dev',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
});
```

Principais endpoints:

| Verbo | Rota | Descrição |
| --- | --- | --- |
| POST | `/users/register` | Cria usuário e retorna JWT |
| POST | `/users/login` | Login e token |
| GET | `/donations` | Lista todas as doações públicas |
| POST | `/donations` | Cria nova doação |
| PUT | `/donations/:id` | Atualiza doação |
| DELETE | `/donations/:id` | Remove doação |

Fluxo típico: **login → salva token → requests automáticas via interceptor**.

---

## 🔐 Segurança & Boas Práticas

- **Variáveis sensíveis** (.env via `expo-constants`) — URLs, chaves de API, etc.
- **Validação de formulário** em tempo real (regex, datas, senhas fortes).
- **Armazenamento seguro** do token JWT em AsyncStorage + header `Authorization`.
- **Tratamento global de erros** (interceptor + modais amigáveis).

---

## 🚀 Como Rodar Localmente

```
# Pré‑requisitos
npm i -g expo-cli   # Node >= 16

# 1. Clone o repo
git clone https://github.com/<seu-usuario>/foodbridge.git
cd foodbridge

# 2. Instale dependências
npm install

# 3. Crie um arquivo .env
API_URL=https://foodbridge-api.fly.dev

# 4. Rode o projeto
npx expo start        # Pressione "a" para Android ou "i" para iOS
```

> Dica: se estiver em emulador Android Studio use 10.0.2.2 para apontar para backend local.
> 

---

## 🧪 Como Testar a API

1. **Swagger UI** hospedado em `https://foodbridge-api.fly.dev/api-docs`.
2. Teste login, criação de doação e filtros.

---

## 📚 Tecnologias & Bibliotecas

| Categoria | Biblioteca | Uso |
| --- | --- | --- |
| Core | **React Native 0.76**, **Expo 52** | UI mobile |
| Navegação | `@react-navigation/native` + stacks/drawers | Rotas & headers |
| State / Storage | React Hooks, **AsyncStorage** | Persistência offline |
| HTTP | **Axios** | Requests e interceptores |
| UI/UX | `react-native-animatable`, `expo-linear-gradient`, `react-native-svg` | Animações & gráficos |
| Imagem | `expo-image-picker`, `expo-file-system` | Avatar e fotos da doação |
| Tipagem | **TypeScript 5.3** | Segurança de tipos |

---

## 👥 Sobre os Desenvolvedores

| Nome | Função | Descrição | GitHub | LinkedIn |
| --- | --- | --- | --- | --- |
| **Daniel Bezerra** | Back‑end Dev | Estrutura do back‑end, API, banco de dados e integração com o app. | [Daniel151296](https://github.com/Daniel151296) | [linkedin.com/in/daniel357](https://www.linkedin.com/in/daniel357/) |
| **José Alexandre** | Pesquisa & Apresentação | Pesquisa, documentação e apresentação do projeto; requisitos e comunicação. | [ycastiel](https://github.com/ycastiel) | [linkedin.com/in/alexandre-de-farias-61a90a308](https://www.linkedin.com/in/alexandre-de-farias-61a90a308/) |
| **Macauly Vivaldo** | Front‑end & UX/UI | Interface visual, prototipagem de telas e experiência do usuário. | [MacaulyV](https://github.com/MacaulyV) | [https://www.linkedin.com/in/macauly-vivaldo-da-silva-1a1514277/](https://www.linkedin.com/in/macauly-vivaldo-da-silva-1a1514277/) |

---

## 🎨 Detalhes Visuais

- **Paleta:** Verde #4CAF50 → esperança; Laranja #FF7F50 → vitalidade.
- **Tipografia:** Inter / Roboto via `@expo-google-fonts`.
- **Animações:** partícula/parallax, transições suaves, feedback tátil.
- **Acessibilidade:** contraste AA, tamanho de fonte escalável, elementos touch > 48 dp.

---

## 🔮 Possíveis Melhorias Futuras

- 🔔 Notificações push em tempo real (Expo Notifications).
- 🛠️ Painel web admin para moderar doações.

---

Desenvolvido com 💡 por estudantes da **FIAP** — 2025.
