/** @define {boolean} */
var DEBUG_MODE = false;
var DEBUG_BRANDS_LIST = ['BMW','Toyota','Briliance','Mazda','Mersedes','AMG'];

function getDebugModels (brand){
    var res = [];
    var rand = Math.round(Math.random()*10);
    var idx  = 0;
    (rand == 0)?idx = 1: idx = rand;

    for (var i = 0; i < idx; i++) {
        res[i] = brand+'-'+i;
     }
    return res;
}

function  getRandYear(startYear, range, out){
    var rand;
    var i = 0;
    var noexisted = false;
    //генерит год, и проверяет его наличие списке выдачи out
    //если такой год есть в списке то генерит новый год и снова проверяет
    //пока сгенерированный год не будет уникальным
    do {
        rand = startYear + Math.round(Math.random()*range);//сгенерл год
        noexisted = false;
        for (i = 0; i < out.length; i++) {
            if (out[i] == rand) {
                noexisted = true;
                break;
            }
        }
    } while (noexisted);
    return rand;
}

function getDebugYears (){
    var res = [];//результат
    var rand;
    //генерю кол-во лет в списке
    var idx = ((rand = Math.round(Math.random()*5)) == 0)? 1: rand;    
    for (var i = 0; i < idx; i++) {
        res[i] = getRandYear(1976, 2018-1976, res);
     }
    return res;
}


/////////////////////////////////////////////////////////////////////////////////////////////////
//берёт случайный мотор из списка, ищет такой в списке выдачи, если нет такого то добавляет в выдачу
//если в выдаче такой уже есть то генерит следующий движок
function  getRandArray(source, out){
    var randIdx;
    var i = 0;
    var existed = false;
    var engine;
    do {
        randIdx = Math.round(Math.random()*source.length);
        if (randIdx >= source.length) randIdx--;
        engine = source[randIdx];
        existed = false;
        for (i = 0; i < out.length; i++) {
            if (out[i] == engine) {
                existed = true;
                break;
            }
        }
    } while (existed);
    return engine;
}

function getDebugEngines (){
    var aEngines = ['1.6 л','1.8 л','2.0 л','2.4 л','3.0 л','3.5 л','3.8 л','4.0 л','5.0 л','6.0 л'];
    var res = [];//результат
    var rand;
    //генерю кол-во движков в списке
    var mNums = ((rand = Math.round(Math.random()*(aEngines.length / 2))) == 0)? 1: rand;   
    //теперь фоомирую список
    for (var i = 0; i < mNums; i++) {
        res[i] = getRandArray(aEngines, res);
     }
    return res;
}

function getDebugGearBoxes (){
    var aGearBoxes = ['механика','автомат','робот','вариатор'];
    var res = [];//результат
    var rand;
    //генерю кол-во движков в списке
    var mNums = ((rand = Math.round(Math.random()*(aGearBoxes.length))) == 0)? 1: rand;   
    //теперь фоомирую список
    for (var i = 0; i < mNums; i++) {
        res[i] = getRandArray(aGearBoxes, res);
     }
    return res;
}

//формирование цены либо ошибки (автомобиля нет в базе)
function getDebugPrice(){
    var rand = Math.random();
    //меньше 0.5-ошибка, >0.5 нормальный ответ
    var err  = (rand <= 0.5)?true:false;
    if (err) {
        return '';
    }
    else {
        return rand = Math.round(Math.random()*(18000000));
    }
      
} 