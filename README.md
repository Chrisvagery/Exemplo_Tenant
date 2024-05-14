# Sistema Multi-Tenant para Gerenciamento de Documentos Fiscais
Este é um sistema de exemplo que demonstra como implementar uma aplicação multi-tenant em JavaScript usando Node.js e MySQL para gerenciar documentos fiscais de várias lojas de departamentos.

# Estratégia Escolhida: Schema-Based Multi-Tenancy
O Schema-Based Multi-Tenancy é uma abordagem na qual cada inquilino (tenant) de um sistema possui seu próprio esquema de banco de dados. Isso significa que, dentro de um único banco de dados, múltiplos esquemas são criados, um para cada inquilino. Essa estratégia oferece uma separação eficiente dos dados, garantindo que as informações de cada inquilino sejam isoladas e seguras.

# Estratégia de Multi-Tenancy:
Na implementação deste sistema multi-tenant, adotamos a estratégia de Schema-Based Multi-Tenancy. Isso significa que cada loja de departamentos (tenant) terá seu próprio esquema no banco de dados MySQL. Essa abordagem proporciona isolamento completo dos dados entre diferentes inquilinos, garantindo que não haja mistura de dados entre as lojas.

## Vantagens
-  **Isolamento de Dados:** Cada inquilino tem seu próprio espaço isolado no banco de dados, evitando conflitos e garantindo privacidade dos dados.
- **Escalabilidade:** Permite escalar o sistema facilmente para acomodar novos inquilinos, adicionando novos esquemas conforme necessário.
- **Facilidade de Gerenciamento:** Simplifica a gestão dos dados, uma vez que cada inquilino é tratado como uma entidade separada.

## Funcionalidades

- Cadastro de Tenants (Lojas de Departamentos)
- Cadastro de Documentos Fiscais


# Documentação da Implementação
#### Tecnologias Utilizadas:

- **Node.js e Express.js:** Utilizados para criar o servidor e as rotas da API.
-  **MySQL:** Banco de dados relacional utilizado para armazenar os dados.
- **Pacote mysql para Node.js:** Utilizado para conectar e interagir com o banco de dados MySQL.

# Implementação do Banco de Dados:
1. **Tabela de tenants (Inquilinos):**

Armazena informações sobre cada inquilino, como nome e esquema associado.
 ## Exemplos codigos mysql
```sql
CREATE TABLE IF NOT EXISTS tenants (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) UNIQUE,
    esquema VARCHAR(100) UNIQUE
);
```

2. **Tabela de documentos_fiscais:**

Armazena os documentos fiscais associados a cada inquilino, com referência ao esquema do tenant correspondente.

## codigos mysql tabela documentos_fiscais

```sql
CREATE TABLE IF NOT EXISTS documentos_fiscais (
    id INT AUTO_INCREMENT PRIMARY KEY,
    numero_documento VARCHAR(100),
    tipo_documento VARCHAR(50),
    valor_total DECIMAL(10, 2),
    tenant_id INT,
    FOREIGN KEY (tenant_id) REFERENCES tenants(id)
);
```


#  Thunder Client
Use o Thunder Client para fazer solicitações HTTP para criar tenants e documentos fiscais:

## Cadastrar Tenant

1. Abra o Thunder Client no VS Code.
2. Crie uma nova solicitação POST para cadastrar um tenant:
  . Defina o método como POST.
  .Insira a URL do endpoint para cadastrar o tenant (por exemplo, **http://localhost:3000/tenants)**.

  . No corpo da solicitação, forneça os dados do tenant em formato JSON. Por exemplo:

```json
{
  "nome": "Minha Loja de Departamentos"
}
```


## Cadastro de Nota Fiscal
1. Crie uma nova solicitação POST para cadastrar uma nota fiscal:
2. Defina o método como POST.
3. Insira a URL do endpoint para cadastrar uma nota fiscal (por   exemplo, **http://localhost:3000/documentos-fiscais)**.
4. No corpo da solicitação, forneça os dados da nota fiscal em formato JSON. Por exemplo:

```json
{
  "numero_documento": "12345",
  "tipo_documento": "Nota Fiscal",
  "valor_total": 1000.00,
  "tenant_id": 1
}
```

Certifique-se de definir o cabeçalho Content-Type como application/json.

## Fluxo de Funcionamento:
1. Quando uma nova loja de departamentos é cadastrada, um novo esquema é criado no banco de dados para ela.
2. Todos os documentos fiscais emitidos por uma loja são armazenados na tabela de documentos fiscais, associados ao esquema do tenant correspondente.

# Considerações Finais:
A estratégia de Schema-Based Multi-Tenancy oferece uma solução robusta para sistemas multi-inquilinos, garantindo a separação completa dos dados e proporcionando escalabilidade e isolamento adequados. 



