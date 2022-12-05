<?php

namespace app\services;

use app\models\Menu;

class MenuArray
{

    static function getData()
    {

        $collection = Menu::find()->orderBy('lft')->asArray()->all();

        $menu = [];

        if($collection){
            $nsTree = new NestedSetsTreeMenu();
            $menu = $nsTree->tree($collection); //создаем дерево в виде массива
        }

        return $menu;
    }

}