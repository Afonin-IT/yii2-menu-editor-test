<?php

namespace app\controllers;

use app\models\Menu;
use Yii;
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
                        'update' => ['PATCH'],
                    ],
                ],
                'corsFilter' => [
                    'class' => \yii\filters\Cors::class,
                    'cors' => [
                        'Origin' => ['*'],
                        'Access-Control-Request-Headers' => ['*'],
                    ]
                ]
            ]
        );
    }

    public function actions()
    {
        $actions = parent::actions();
        unset($actions['update']);
        unset($actions['delete']);
        return $actions;
    }

    public function actionGet()
    {
        $roots = Menu::find()->all();
        return $roots;
    }

    public function actionPost()
    {
        $post = $this->request->post();

        $label = $post['label'] ?? null;
        $link = $post['link'] ?? "";

        if ($label) {
            $maxPosition = Menu::find()->max('position');

            $model = new Menu();
            $model->label = $label;
            $model->link = $link;
            $model->position = $maxPosition + 1;
            $model->makeRoot();

            return $model;
        }

        return null;
    }

    public function actionUpdate($id)
    {
        $post = $this->request->post();

        if ($model = Menu::findOne(['id' => $id])) {
            $label = $post['label'] ?? $model->label;
            $link = $post['link'] ?? $model->link;
            $position = $post['position'] ?? $model->position;
            $parent_id = $post['parent_id'] ?? null;

            $model->label = $label;
            $model->link = $link;

            if ($position !== null && $position >= 1) {
                if ($position < $model->position) {
                    $sql = <<<SQL
                        IF :depth = 0 THEN
                            UPDATE menu SET position = position + 1 WHERE id != :id AND depth = :depth AND position >= :pos AND position < :modelPos;
                        ELSE
                            UPDATE menu SET position = position + 1 WHERE id != :id AND tree = :tree AND position >= :pos AND position < :modelPos;
                        END IF;
                        SQL;
                } else if ($position > $model->position) {
                    $sql = <<<SQL
                        IF :depth = 0 THEN
                            UPDATE menu SET position = position - 1 WHERE id != :id AND depth = :depth AND position <= :pos AND position > :modelPos;
                        ELSE
                            UPDATE menu SET position = position - 1 WHERE id != :id AND tree = :tree AND position <= :pos AND position > :modelPos;
                        END IF;
                        SQL;
                }

                Yii::$app->db->createCommand($sql)
                    ->bindValue(':depth', $model->depth)
                    ->bindValue(':id', $model->id)
                    ->bindValue(':tree', $model->tree)
                    ->bindValue(':modelPos', $model->position)
                    ->bindValue(':pos', $position)->execute();

                $model->position = $position;
            }

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

            return Menu::find()->all();
        }
    }

    public function actionDelete($id)
    {
        if($model = Menu::findOne($id)) {
            $sql = <<<SQL
                IF :depth = 0 THEN
                    UPDATE menu SET position = position - 1 WHERE id != :id AND depth = :depth AND position > :modelPos;
                ELSE
                    UPDATE menu SET position = position - 1 WHERE id != :id AND tree = :tree AND position > :modelPos;
                END IF;
                SQL;

            Yii::$app->db->createCommand($sql)
                ->bindValue(':id', $model->id)
                ->bindValue(':depth', $model->depth)
                ->bindValue(':tree', $model->tree)
                ->bindValue(':modelPos', $model->position)->execute();

            $model->deleteWithChildren();
        }

        return Menu::find()->all();
    }
}
