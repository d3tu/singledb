"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
var fs_1 = require("fs");
var path_1 = require("path");
var Database = /** @class */ (function () {
    function Database(path) {
        var _this = this;
        this.path = path;
        if (!(0, fs_1.existsSync)(path)) {
            (0, fs_1.mkdirSync)((0, path_1.dirname)(path), { recursive: true });
            this.obj = this.write = {};
        }
        else
            this.obj = this.read;
        return new Proxy(this.obj, {
            set: function (target, key, value) {
                Object.assign(target, _this.read);
                target[key] = value;
                _this.write = target;
                return true;
            },
            get: function (target, key) {
                Object.assign(target, _this.read);
                return target[key];
            },
            deleteProperty: function (target, key) {
                Object.assign(target, _this.read);
                var bool = delete target[key];
                _this.write = target;
                return bool;
            },
        });
    }
    Object.defineProperty(Database.prototype, "read", {
        get: function () {
            return JSON.parse((0, fs_1.readFileSync)(this.path, 'utf-8'));
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Database.prototype, "write", {
        set: function (data) {
            (0, fs_1.writeFileSync)(this.path, JSON.stringify(data, undefined, 2));
        },
        enumerable: false,
        configurable: true
    });
    return Database;
}());
exports.Database = Database;
exports.default = Database;
