import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class Usuario extends Model {
    static init(sequelize) {
        super.init(
            {
                st_nome: Sequelize.STRING,
                st_email: Sequelize.STRING,
                st_senha: Sequelize.STRING
            },
            {
                sequelize,
                modelName: "Usuario",
                tableName: 'usuarios'
            }
        );

        this.addHook('beforeSave', async (usuario) => {
            if(usuario.st_senha) {
               usuario.st_senha = await bcrypt.hash(usuario.st_senha, 8);
            }
        });
 
        return this;
    }

    compararSenhas(senha){
        return bcrypt.compare(senha, this.st_senha);
    }
}

export default Usuario; 