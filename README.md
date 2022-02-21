# Info Test
## Mateus Martins Pereira
### Como configurar
- Abrir o terminal na pasta raiz do projeto e executar:
    - `npm install`
### Como utilizar
- Para abrir o servidor:
    - `npm start`
- Para executar os testes:
    - `npm run test` (necessita do servidor estar aberto)
-  A seguir há a relação entre cada endpoint e a ação executada por ele:
    - GET `http://localhost:3333/vehicles`
        - Exibe todos os veículos cadastrados
    - GET `http://localhost:3333/vehicles/:id`
        - Exibe o veículo com id :id
    - POST `http://localhost:3333/vehicles`
        - Cadastra um veículo com as informações enviadas no formato JSON
    - PUT `http://localhost:3333/vehicles/:id`
        - Atualiza um veículo com id :id e informações enviadas no formato JSON
    - DELETE `http://localhost:3333/vehicles/:id`
        - Deleta um veículo com id :id