<?php

namespace app\controllers;

use app\models\Menu;
use yii\filters\VerbFilter;
use yii\rest\ActiveController;

/**
 * MenuController implements the CRUD actions for Menu model.
 */
class MenuController extends ActiveController
{
    public $modelClass = 'app\models\Menu';


    public function behaviors()
    {
        return array_merge(
            parent::behaviors(),
            [
                'verbs' => [
                    'class' => VerbFilter::class,
                    'actions' => [
                        'get' => ['GET'],
                        'post' => ['POST'],
                    ],
                ],
            ]
        );
    }

    public function actionGet()
    {
        $roots = Menu::find()->all();
        return $roots;
    }

    public function actionPost()
    {
        $post = $this->request->post();

        $id = $post['id'] ?? null;
        $position = $post['position'] ?? null;
        $label = $post['label'] ?? null;
        $link = $post['link'] ?? null;
        $parent_id = $post['parent_id'] ?? null;

        if ($id !== null && $model = Menu::findOne(['id' => $id])) {
            if ($label) $model->label = $label;
            if ($link) $model->link = $link;
            if ($position !== null && $position >= 0) $model->position = $position;
            $model->save();

            if ($parent_id !== null && $parent_id === 0) {
                if (!$model->isRoot())
                    $model->makeRoot();
            } else if ($parent_id > 0) // move node to other root
            {
                if ($model->id != $parent_id) {
                    $parent = Menu::findOne($parent_id);
                    $model->appendTo($parent);
                }
            }

            return Menu::find()->select(['id', 'label', 'link', 'tree', 'position'])->all();
        }

        $model = new Menu();
        $model->label = $label;
        $model->link = $link;
        $model->position = $position;
        $model->makeRoot();

        return Menu::find()->select(['id', 'label', 'link', 'tree', 'position'])->all();
    }

    public function actionRemove($id)
    {
        $model = Menu::findOne($id);

        $model->deleteWithChildren();

        return Menu::find()->select(['id', 'label', 'link', 'tree', 'position'])->all();
    }
}
