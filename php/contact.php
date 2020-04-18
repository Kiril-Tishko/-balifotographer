<?php
$name = htmlspecialchars($_POST['name']);
$email = htmlspecialchars($_POST['email']);
$message = htmlspecialchars($_POST['message']);


date_default_timezone_set('Etc/UTC');

require '../lib/PHPMailer/PHPMailerAutoload.php';

$mail = new PHPMailer;
$mail->isSMTP();


/*
 * Server Configuration
 */
$mail->Host = 'smtp.gmail.com';                     // Which SMTP server to use.
$mail->Port = 587;                                  // Which port to use, 587 is the default port for TLS security.
$mail->SMTPSecure = 'tls';                          // Which security method to use. TLS is most secure.
$mail->SMTPAuth = true;                             // Whether you need to login. This is almost always required.
$mail->Username = "kirillovichtishko@gmail.com";    // Your Gmail address.
$mail->Password = "1243512435";                     // Your Gmail login password or App Specific Password.
$mail->CharSet = 'utf-8';
$mail->SMTPDebug = 0;


/*
 * Message Configuration
 */
$mail->setFrom('kirillovichtishko@gmail.com', 'ЗАКАЗЧИК Проверяет');   // Set the sender of the message.
$mail->addAddress('kstishko@gmail.com', 'Кирилл Тишко');     // Set the recipient of the message.
$mail->Subject = ':>) :>) Заявки с сайта "АЛИНА ЛЕБЕДЕВА" (Заказчик пишет АЛИНЕ ЛЕБЕДЕВОЙ)';                       // The subject of the message.


/*
 * Message Content
 */
$mail->isHTML(true);
$mail->Body = '<p>Это сообщение отправлено с сайта: photographersite·pp·ua</p><br><p>Имя отправителя:<br><b>' .$name . '</b></p><p>Email:<br><b>' .$email . '</b></p><p>Сообщение:<br><b>' .$message . '</b></p>';
$mail->AltBody = 'Это альтернативное текст сооообщения';


if ($mail->send()) {
    echo "Ваше сообщение отправлено!";
} else {
    echo "Ошибка: " . $mail->ErrorInfo;
}


ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);