<?php

namespace app\services;

use app\models\Menu;

class MenuArray
{

    static function getData()
    {
        $sortByTreeIndex = function ($collection) {
            $itemsObj = array_reduce($collection, function ($carry, $item) {
                if(array_key_exists($item['tree'], $carry)) {
                    array_push($carry[$item['tree']], $item);
                } else {
                    $carry[$item['tree']] = [$item];
                }

                return $carry;
            }, []);

            return array_values($itemsObj);
        };

        $collection = Menu::find()->orderBy('lft')->asArray()->all();

        $menu = [];

        if($collection){
            $nsTree = new NestedSetsTreeMenu();
            $menu = array_map(function($item) use ($nsTree) {
                return $nsTree->tree($item)[0];
            }, $sortByTreeIndex($collection));
        }

        return $menu;
    }

}