import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { name, email, message } = req.body;

    // Validação
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Campos obrigatórios não preenchidos' });
    }

    try {
        // Configurar transportador de e-mail
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT),
            secure: false, // true para 465, false para outras portas
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
        });

        // HTML estilizado do e-mail
        const htmlContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <style>
                    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5; }
                    .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 40px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
                    .header { border-bottom: 3px solid #007bff; padding-bottom: 20px; margin-bottom: 30px; }
                    .header h1 { color: #333; margin: 0; font-size: 28px; }
                    .header p { color: #666; margin: 5px 0 0 0; font-size: 14px; }
                    .content { color: #333; line-height: 1.6; }
                    .info-box { background-color: #f9f9f9; border-left: 4px solid #007bff; padding: 15px; margin: 20px 0; border-radius: 4px; }
                    .info-box label { font-weight: bold; color: #007bff; display: block; margin-bottom: 5px; }
                    .info-box p { margin: 0; color: #555; word-break: break-word; }
                    .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; font-size: 12px; color: #999; }
                    .escolarize-badge { display: inline-block; background-color: #007bff; color: white; padding: 10px 20px; border-radius: 20px; margin-bottom: 20px; font-weight: bold; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <div class="escolarize-badge">ESCOLARIZE</div>
                        <h1>Novo Contato Recebido</h1>
                        <p>Você recebeu uma nova mensagem do formulário de contato</p>
                    </div>

                    <div class="content">
                        <div class="info-box">
                            <label>👤 Nome do Usuário:</label>
                            <p>${name}</p>
                        </div>

                        <div class="info-box">
                            <label>📧 E-mail:</label>
                            <p><a href="mailto:${email}">${email}</a></p>
                        </div>

                        <div class="info-box">
                            <label>💬 Mensagem:</label>
                            <p>${message.replace(/\n/g, '<br>')}</p>
                        </div>

                        <p style="color: #999; font-size: 12px; margin-top: 30px;">
                            <strong>Data e Hora:</strong> ${new Date().toLocaleString('pt-BR')}
                        </p>
                    </div>

                    <div class="footer">
                        <p>Este e-mail foi enviado automaticamente pelo sistema Escolarize.</p>
                        <p>Plataforma de Banco de Dados - Psicologia Escolar e Educacional</p>
                    </div>
                </div>
            </body>
            </html>
        `;

        // Enviar e-mail
        const mailOptions = {
            from: process.env.CONTACT_EMAIL_FROM,
            to: process.env.CONTACT_EMAIL_TO,
            subject: `Novo contato via Site Escolarize - ${name}`,
            html: htmlContent,
            replyTo: email,
        };

        await transporter.sendMail(mailOptions);

        return res.status(200).json({ 
            success: true, 
            message: 'E-mail enviado com sucesso!' 
        });
    } catch (error) {
        console.error('Erro ao enviar e-mail:', error);
        return res.status(500).json({ 
            error: 'Erro ao enviar e-mail. Tente novamente mais tarde.' 
        });
    }
}