# Auto Norber
## Ferramenta para realizar marcação de ponto de maneira automatizada

### Instalando dependências
    npm install

### Configurando
É necessário criar um arquvo de configuração no diretório do projeto chamado config.json.
Exemplo:

    {
        "siteUrl": "url.do.site",
        "codEmpresa": "codigo.da.empresa",
        "username": "usuario.da.rede",
        "password": "senha"
    }

### Executando
    node register.js - realiza marcação de ponto
    node show-history.js - gera uma imagem com as marcações do mês atual
