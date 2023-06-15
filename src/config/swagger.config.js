const { dirname } = require('path')
console.log(dirname(__dirname))
exports.swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'Documentación De App para Adoptar Mascotas Adoptame',
            description: 'Api pensada para adopción de mascotas'
        }
    },
    apis: [`${dirname(__dirname)}/docs/**/*.yaml`]
}