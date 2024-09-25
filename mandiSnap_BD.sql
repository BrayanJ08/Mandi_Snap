create database mandiSnap
use  mandiSnap

create table usuario (
id_usuario serial primary key not null,
nombre_usuario varchar(50) not null,
contraseña varchar(30) not null,
email varchar(100) not null
)

alter table usuario add column rol varchar(30) not null;



CREATE PROCEDURE insertarUsuario(
    IN p_nombre_usuario VARCHAR(50),
    IN p_contraseña VARCHAR(30),
    IN p_email VARCHAR(100),
    IN p_rol VARCHAR(30)
)
    -- Insertar un nuevo usuario en la tabla 'usuario'
    INSERT INTO usuario (nombre_usuario, contraseña, email, rol)
    VALUES (p_nombre_usuario, p_contraseña, p_email, p_rol);
    
    CALL insertarUsuario('usuario_ejemplo', 'contraseña123', 'email@ejemplo.com', 'admin');
    
    select * from usuario



