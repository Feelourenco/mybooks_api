# mybooks_api

## Instalação

1. **Clone o Repositório:**

    ```bash
    git clone https://github.com/[seu-usuario]/mybooks_api.git

2. **Navegue até o diretório que fez o clone**

    ```bash
    cd mybooks_api
    
3. **Instale as dependencias necessárias**
    
    ```bash
    npm install

4. **Crie o arquivo .env:** 
    
    ```bash
    cp .env.sample .env
    
5. Edite o arquivo `.env` e configure as variáveis de ambiente necessárias.

6. **Gere as migrations:**

    ```bash
    npx prisma migrate dev --name init

7. **Para executar a aplicação:**
    
    ```bash
    npm run dev
