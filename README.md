## Integrantes
- Ana Julia Rocha Cezanoski
- Izabelly Mucholowski Ribeiro
- Kauane Santana da Rosa
- Lucas Nascimento da Silva
- Pedro Leonardo Alves da Silva

## Descrição
Este é um sistema desenvolvido em **Spring Boot (Java) e React** para gerenciar doações destinadas a uma ONG de gatos. O sistema permite o cadastro de doadores, controle de doações recebidas e administração dos recursos da ONG.

## Tecnologias Utilizadas
- **Java 17+**
- **Spring Boot**
- **MySQL** (Banco de Dados)
- **React.js** (Front-end)
- **Node.js** (para rodar o front-end)
- **Postman** (para testes de API) ou outra ferramenta similar

## Pré-requisitos
Antes de instalar e rodar o projeto, certifique-se de ter instalado:
- **JDK 17** ou superior
- **Spring Boot**
- **MySQL Server**
- **Node.js** (para rodar o front-end)
- **Uma IDE** (IntelliJ IDEA, Eclipse, VS Code com extensões para Java)
- **Postman** ou **Insomnia** para testes de API

## Instalação e Execução

### Back-end
1. **Clone o repositório**
   ```sh
   git clone https://github.com/kausdr/Ong-Gato.git
   ```

2. **Configure o banco de dados**
   - Banco de dados já será criado no MySQL após a execução do projeto:
   - Atualize as credenciais do banco no arquivo `application.properties` ou `application.yml`.

3. **Instale as dependências**
   ```sh
   mvn clean install
   ```

4. **Execute o projeto**
   ```sh
   mvn spring-boot:run
   ```
   ou diretamente pela sua IDE.

5. **Testando os Endpoints**
   - Utilize **Postman**, **Insomnia** ou outra ferramenta para realizar chamadas às rotas da API.
   - O sistema estará rodando em `http://localhost:8080`.

### Front-end
1. **Acesse a pasta do front-end**
   ```sh
   cd ../ong-gato-app-front
   ```
2. **Instale as dependências**
   ```sh
   npm install
   ```
3. **Execute o projeto**
   ```sh
   npm run dev
   ```
