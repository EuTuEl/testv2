<?php
require_once "../common/config.php";
require "../vendor/autoload.php";

use Illuminate\Database\Capsule\Manager as Capsule;

class DB {
    private static $initialized;
    private static Illuminate\Database\Capsule\Manager $db;
    private static function initialize(): void
    {
        if (self::$initialized)
            return;

        self::$initialized = true;
        $capsule = new Capsule;
        $capsule->addConnection([
            "driver" => DB_DRIVER,
            "host" => DB_HOST,
            "database" => DB_NAME,
            "username" => DB_USER,
            "password" => DB_PASS
        ]);
        $capsule->setAsGlobal();
        $capsule->bootEloquent();

        self::$db = $capsule;
    }

    public static function getAllCars(): \Illuminate\Support\Collection
    {
        self::initialize();
        return self::$db::table("cars")
            ->select("*")
            ->get();
    }

    public static function insertCar(array $args): bool
    {
        self::initialize();

        $r = self::$db::table("cars")
            ->insert(["brand" => $args["brand"], "model"=> $args["model"], "year"=> $args["year"], "price"=> $args["price"],
                "engine"=> $args["engine"], "fuel"=> $args["fuel"], "power"=> $args["power"], "image"=> $args["image"], "description"=> $args["description"]]);

        return $r;
    }
}