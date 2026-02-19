<?php
/**
 * ASO-RECICLADOR Image Upload API
 * 
 * Subir este archivo a: asorecicladoresp.com/api/upload.php
 * Crear carpeta: /uploads/eventos/ con permisos 755
 * 
 * Protegido con API key via header X-Upload-Key
 * Solo acepta JPG, PNG, WebP (max 5MB)
 * Comprime y redimensiona automaticamente (max 1200px ancho)
 */

// CORS - Solo permitir tu dominio de Vercel
$allowed_origins = [
    'https://asorecicladoresp.com',
    'https://www.asorecicladoresp.com',
    // Agrega tu dominio de Vercel aqui:
    // 'https://tu-app.vercel.app',
];

$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';
if (in_array($origin, $allowed_origins)) {
    header("Access-Control-Allow-Origin: $origin");
}
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: X-Upload-Key, Content-Type");
header("Content-Type: application/json; charset=utf-8");

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Solo POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Metodo no permitido']);
    exit;
}

// ===== CONFIGURACION =====
// IMPORTANTE: Cambia esta clave por la misma que configures en UPLOAD_API_KEY de Vercel
$API_KEY = 'TU_CLAVE_SECRETA_AQUI'; // <-- CAMBIAR ESTO
$UPLOAD_DIR = __DIR__ . '/../uploads/eventos/';
$UPLOAD_URL_BASE = 'https://asorecicladoresp.com/uploads/eventos/';
$MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
$MAX_WIDTH = 1200;
$QUALITY = 85;
// ===========================

// Verificar API key
$provided_key = isset($_SERVER['HTTP_X_UPLOAD_KEY']) ? $_SERVER['HTTP_X_UPLOAD_KEY'] : '';
if (empty($provided_key) || !hash_equals($API_KEY, $provided_key)) {
    http_response_code(403);
    echo json_encode(['error' => 'Acceso no autorizado']);
    exit;
}

// Verificar archivo
if (!isset($_FILES['file']) || $_FILES['file']['error'] !== UPLOAD_ERR_OK) {
    http_response_code(400);
    $error_msg = 'No se envio archivo';
    if (isset($_FILES['file'])) {
        switch ($_FILES['file']['error']) {
            case UPLOAD_ERR_INI_SIZE:
            case UPLOAD_ERR_FORM_SIZE:
                $error_msg = 'Archivo demasiado grande';
                break;
            case UPLOAD_ERR_NO_FILE:
                $error_msg = 'No se selecciono archivo';
                break;
        }
    }
    echo json_encode(['error' => $error_msg]);
    exit;
}

$file = $_FILES['file'];

// Verificar tamano
if ($file['size'] > $MAX_FILE_SIZE) {
    http_response_code(400);
    echo json_encode(['error' => 'La imagen no puede pesar mas de 5MB']);
    exit;
}

// Verificar tipo MIME real (no confiar solo en la extension)
$finfo = finfo_open(FILEINFO_MIME_TYPE);
$mime = finfo_file($finfo, $file['tmp_name']);
finfo_close($finfo);

$allowed_mimes = [
    'image/jpeg' => 'jpg',
    'image/png' => 'png',
    'image/webp' => 'webp',
];

if (!isset($allowed_mimes[$mime])) {
    http_response_code(400);
    echo json_encode(['error' => 'Solo se permiten imagenes JPG, PNG o WebP']);
    exit;
}

$ext = $allowed_mimes[$mime];

// Crear directorio por fecha (YYYY-MM)
$date_folder = date('Y-m');
$target_dir = $UPLOAD_DIR . $date_folder . '/';

if (!is_dir($target_dir)) {
    if (!mkdir($target_dir, 0755, true)) {
        http_response_code(500);
        echo json_encode(['error' => 'Error al crear directorio de subida']);
        exit;
    }
}

// Generar nombre unico
$filename = uniqid('evt_', true) . '.' . $ext;
$target_path = $target_dir . $filename;

// Cargar imagen para redimensionar y comprimir
$source_image = null;
switch ($mime) {
    case 'image/jpeg':
        $source_image = imagecreatefromjpeg($file['tmp_name']);
        break;
    case 'image/png':
        $source_image = imagecreatefrompng($file['tmp_name']);
        break;
    case 'image/webp':
        $source_image = imagecreatefromwebp($file['tmp_name']);
        break;
}

if (!$source_image) {
    http_response_code(500);
    echo json_encode(['error' => 'Error al procesar la imagen']);
    exit;
}

// Obtener dimensiones
$orig_width = imagesx($source_image);
$orig_height = imagesy($source_image);

// Redimensionar si es necesario
if ($orig_width > $MAX_WIDTH) {
    $new_width = $MAX_WIDTH;
    $new_height = intval(($orig_height / $orig_width) * $new_width);
    
    $resized = imagecreatetruecolor($new_width, $new_height);
    
    // Preservar transparencia para PNG
    if ($mime === 'image/png') {
        imagealphablending($resized, false);
        imagesavealpha($resized, true);
    }
    
    imagecopyresampled($resized, $source_image, 0, 0, 0, 0, $new_width, $new_height, $orig_width, $orig_height);
    imagedestroy($source_image);
    $source_image = $resized;
}

// Guardar imagen comprimida
$saved = false;
switch ($mime) {
    case 'image/jpeg':
        $saved = imagejpeg($source_image, $target_path, $QUALITY);
        break;
    case 'image/png':
        $saved = imagepng($source_image, $target_path, 8); // compression 0-9
        break;
    case 'image/webp':
        $saved = imagewebp($source_image, $target_path, $QUALITY);
        break;
}

imagedestroy($source_image);

if (!$saved) {
    http_response_code(500);
    echo json_encode(['error' => 'Error al guardar la imagen']);
    exit;
}

// Retornar URL publica
$public_url = $UPLOAD_URL_BASE . $date_folder . '/' . $filename;

echo json_encode([
    'success' => true,
    'url' => $public_url,
    'filename' => $filename,
    'size' => filesize($target_path),
]);
