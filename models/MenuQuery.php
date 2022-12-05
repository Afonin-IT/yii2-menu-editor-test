<?php

namespace app\models;

use creocoder\nestedsets\NestedSetsQueryBehavior;

/**
 * MenuQuery represents the model behind the search form of `app\models\Menu`.
 */
class MenuQuery extends \yii\db\ActiveQuery
{
    public function behaviors()
    {
        return [
            NestedSetsQueryBehavior::class,
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['id', 'tree', 'lft', 'rgt', 'depth', 'position', 'created_at', 'updated_at'], 'integer'],
            [['label', 'link'], 'safe'],
        ];
    }

}
