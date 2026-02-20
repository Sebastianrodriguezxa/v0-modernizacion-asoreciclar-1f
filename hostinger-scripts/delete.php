<?php
/**
 * ASO-RECICLADOR Image Delete API
 * 
 * Subir este archivo a: asorecicladoresp.com/api/delete.php
 * 
 * Protegido con API key via header X-Upload-Key
 * Solo elimina imagenes dentro de /uploads/eventos/
 */

// CORS
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

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Metodo no permitido']);
    exit;
}

// ===== CONFIGURACION =====
$API_KEY = 'TU_CLAVE_SECRETA_AQUI'; // <-- CAMBIAR: misma clave que en upload.php
$UPLOAD_DIR = __DIR__ . '/../uploads/eventos/';
$UPLOAD_URL_BASE = 'https://asorecicladoresp.com/uploads/eventos/';
// ===========================

// Verificar API key
$provided_key = isset($_SERVER['HTTP_X_UPLOAD_KEY']) ? $_SERVER['HTTP_X_UPLOAD_KEY'] : '';
if (empty($provided_key) || !hash_equals($API_KEY, $provided_key)) {
    http_response_code(403);
    echo json_encode(['error' => 'Acceso no autorizado']);
    exit;
}

// Leer body JSON
$input = json_decode(file_get_contents('php://input'), true);

if (!isset($input['url']) || empty($input['url'])) {
    http_response_code(400);
    echo json_encode(['error' => 'URL de imagen requerida']);
    exit;
}

$url = $input['url'];

// Verificar que la URL pertenece a nuestro dominio de uploads
if (strpos($url, $UPLOAD_URL_BASE) !== 0) {
    http_response_code(400);
    echo json_encode(['error' => 'URL no valida']);
    exit;
}

// Extraer ruta relativa y sanitizar (prevenir path traversal)
$relative_path = str_replace($UPLOAD_URL_BASE, '', $url);
$relative_path = str_replace(['..', "\0"], '', $relative_path);

// Validar que solo contiene caracteres seguros
if (!preg_match('/^[a-zA-Z0-9_\-\/\.]+$/', $relative_path)) {
    http_response_code(400);
    echo json_encode(['error' => 'Nombre de archivo no valido']);
    exit;
}

$file_path = $UPLOAD_DIR . $relative_path;

// Verificar que el archivo existe y esta dentro del directorio permitido
$real_upload_dir = realpath($UPLOAD_DIR);
$real_file_path = realpath($file_path);

if (!$real_file_path || strpos($real_file_path, $real_upload_dir) !== 0) {
    http_response_code(404);
    echo json_encode(['error' => 'Archivo no encontrado']);
    exit;
}

// Eliminar
if (unlink($real_file_path)) {
    echo json_encode(['success' => true, 'message' => 'Imagen eliminada']);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Error al eliminar el archivo']);
}
