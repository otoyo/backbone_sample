<?php
    if (!empty($_GET['pref'])) {
        $pref = htmlspecialchars($_GET['pref']);
        
        if ($pref == 13 || $pref == 27) {
            $res = file_get_contents("http://www.drk7.jp/weather/json/{$pref}.js");

            // JSON
//            echo preg_replace('/^(.*)\((.*)\);\s?$/', '$2', $res);

            // standard JSONP
            echo preg_replace('/^(.*)\((.*)\);\s?$/', 'callback($2)', $res);
        }
    }
?>
