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
                sequelize
            }
        );

        this.addHook('beforeSave', async (usuario) => {
            if(usuario.st_senha) {
               usuario.st_senha = await bcrypt.hash(usuario.st_senha, 8);
            }
        });
 
        return this;
    }
}

export default Usuario; 