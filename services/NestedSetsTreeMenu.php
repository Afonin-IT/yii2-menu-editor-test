<?php

namespace app\services;

use Yii;


class NestedSetsTreeMenu extends NestedSetsTree
{
    public $childrenOutAttribute = 'items';

    protected function addItem($node)
    {
        $node = $this->makeUrl($node);

        return $node;
    }

    private function makeUrl($node) {
        if(strlen($node['link']) > 0) {
            $newNode = [
                'url' => [$node['link']]
            ];
            unset($node['link']);

            return array_merge($node, $newNode);
        }

        return $node;
    }

}