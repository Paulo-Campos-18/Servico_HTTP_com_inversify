# Projeto Serviço HTTP com iversify

## Instalação e Configuração

Siga os passos abaixo para preparar o ambiente:

## Instale as dependências

```bash
    npm install
```
<br>

## Crindo arquivo .env

<li>No arquivo .env_template você encontrara a estrutura padrão do .env. <br> 
<li>Crie um .env na pasta raiz do projeto cole a estrutra e altere como recomendado no proprio .env_template
<br>

## Envio de e-mails em ambiente PROD (Gmail)

Para o envio de e-mails reais em ambiente de produção, este projeto utiliza o SMTP do Gmail via Nodemailer.

Por questões de segurança, o Google **não permite o uso da senha normal da conta**.  
É necessário criar uma **Senha de App (App Password)**.

### Como gerar a senha de app

1. Ative a verificação em duas etapas na sua conta Google.
2. Acesse a página oficial do Google:
   https://support.google.com/accounts/answer/185833
3. Crie uma nova App Password para o tipo "Mail".
4. Utilize a senha gerada no arquivo `.env` na variável `SMTP_PASS`.

⚠️ **Nunca versionar a senha no GitHub.**


## Execução

Para rodar a API :

```bash
   npm run start
```

O servidor iniciará em `http://localhost:3000`.
<br> 

## Como testar
<li> Utilize o cURL (terminal) ou ferramentas como Postman/Insomnia para enviar requisições GET.
<li> Neste caso meu exmeplo é com base no postman

### Url padrão
```bash
   http://localhost:3000/relatorio/n?email=email_de_destino
```
<li>Sendo n a quantidade de linhas do relatório a ser enviado.
<li>E <code>email_de_destino</code> o email de quem irá receber o relatório.

## Alterando ambiente
<li>No .env criado nos passos anteriores existe <code>APP_ENV=dev</code>
<li>Use <code>APP_ENV=dev</code> para exibir o logger no console e cirar/enviar emails etheral
<li> Use <code>APP_ENV=prod</code> para salvar loggs no arquivo <code>app.log</code> e enviar emails reais via <strong>Gmail</strong>

## Rodando testes
<li>Para rodar os teste basta usar o seguinte comando no terminal <code>npm run test</code></li>

## Notas
<li>No momento apenas gmail é suportado, seria preciso trocar <code>SMTP_HOST e SMTP_PORT</code> para usar outro.
