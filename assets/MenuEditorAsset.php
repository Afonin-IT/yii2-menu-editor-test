<?php
namespace app\assets;

use yii\helpers\FileHelper;
use yii\web\AssetBundle;


class MenuEditorAsset extends AssetBundle
{
    public $sourcePath = '@app/components/MenuEditor/build/static';

    private function getAllFiles($folder, $pattern) {
        $toBaseName = function ($path) {
            $bn = basename($path);
            $dn = basename(dirname($path));
            return "$dn/$bn";
        };

        $appPath = \Yii::getAlias('@app');
        $files = FileHelper::findFiles("$appPath/components/MenuEditor/build/static/$folder", ['only'=>[$pattern]]);
        return array_map($toBaseName, $files);
    }

    public $css = [];
    public $js = [];

    public function init()
    {
        $this->css = $this->getAllFiles('css', '*.css');
        $this->js = $this->getAllFiles('js', '*.js');
    }

    public $depends = [
        'yii\web\YiiAsset',
    ];
}
