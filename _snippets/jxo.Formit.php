<?php
$defaults = array(
    'emailFrom' => $modx->getOption('emailsender'),
    'emailFromName' => $modx->getOption('site_name'),
    'successMessage' => 'ok',
    'validationErrorMessage' => 'error'
);
$scriptProperties = array_merge($defaults, $scriptProperties);

$modx->runSnippet('Formit', $scriptProperties);

$fields = array('recaptchav2_error');

// получаем список полей из validate
$validate = $scriptProperties['validate'];
if(!empty($validate)) {
    $validationFields = explode(',', $validate);
    foreach ($validationFields as $idx => $v) {
        $v = trim(ltrim($v),' ');
        $key = explode(':',$v);
        if (!empty($key[0])) {
            $field = $key[0];
            $fields[] = $field;
        }
    }
    
}

$errors = array();

foreach($fields as $field) {
    $error = $modx->getPlaceholder('fi.error.'.$field);
    if(!empty($error)) {
        $errors[$field] = array(
            'field' => $field,
            'message' => $error
        );
    }
}

$result = array(
    "success" => !(count($errors) > 0),
    "errors" => $errors,
    "error_message" => $modx->getPlaceholder('fi.validation_error_message')
);

return $modx->toJSON($result);