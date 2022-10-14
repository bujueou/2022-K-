var i=0;
var x = 1;//随机数
var y=1;//随机数
var layleft;//用来标记左边棋盘是否可放置
var layright;//用来标记右边棋盘是否可放置
var lay=0;//用来标记是否可以放置骰子，1为可放置，0为不可放置
var wins1 = [0,0,0,0,0,0,0,0,0];//棋盘一，人
var wins2 = [0,0,0,0,0,0,0,0,0];//棋盘二，机
var count1 = 0;//都没下棋就都是0，下满了就是9
var count2 = 0;
var wins = [0,0];//计数板
diceArrays = ["./images/心想事成.jpg","./images/1.jpg","./images/2.jpg","./images/3.jpg","./images/4.jpg","./images/5.jpg","./images/6.jpg"]
//图片src数组
$(document).ready(function() {
    $("div.card-text").text("hi");
    var dice1 = "images/dice-1.svg";
    var dice2 = "images/dice-2.svg";
    var dice3 = "images/dice-3.png";
    var dice4 = "images/dice-4.png";
    var dice5 = "images/dice-5.png";
    var dice6 = "images/dice-6.png";

    $("#throw").click(function() {//设置抛掷按钮的点击事件
        var num = 0;
       // if(lay==0) 小小开个挂
        var interval = setInterval(function() {
            num += 1;
            x = Math.floor((Math.random() * 10) + 1) % 6 + 1;//产生一个随机数
            switch (x) {
                case 1:
                    $("#dice_img").attr("src", dice1);
                    break;
                case 2:
                    $("#dice_img").attr("src", dice2);
                    break;
                case 3:
                    $("#dice_img").attr("src", dice3);
                    break;
                case 4:
                    $("#dice_img").attr("src", dice4);
                    break;
                case 5:
                    $("#dice_img").attr("src", dice5);
                    break;
                case 6:
                    $("#dice_img").attr("src", dice6);
                    break;
                default:
                    $("#dice_img").attr("src", dice1);
            }
            if (num == 12) {//num用于设置图片播放的次数
                clearInterval(interval);
                var texts = "點擊按鈕來擲骰子，您的結果是：" + x;
                $("p.card-text").text(texts);
                lay=1;//在骰子图片播放完之后再使lay置1，使图片可以被放置
            }
        }, 50);
    });
});

function throwClick() { //设置点击抛掷按钮之后的事件
       
        if(i % 2 === 0){//i用于判断目前是在左边还是右边
            i++
            layleft = 1 //用于判断左边是否可以放置
            layright = 0
        }else{
            i++
            layleft = 0
            layright = 1
        }
        
       // lay=1;
    }
    

function layImg(id,lay_num) //用于放置图片的函数
{
    document.getElementById(id).src = diceArrays[lay_num]
}

function layNum(id)//将骰子的值记录在数组中
{
    if(lay==1){ //如果可放置且左边
    switch (id){
        case "leftbox1": if(wins1[0]!=0)laynum(id);wins1[0]=x;leftremove();break;
        case "leftbox2": if(wins1[1]!=0)laynum(id);wins1[1]=x;leftremove();break;
        case "leftbox3": if(wins1[2]!=0)laynum(id);wins1[2]=x;leftremove();break;
        case "leftbox4": if(wins1[3]!=0)laynum(id);wins1[3]=x;leftremove();break;
        case "leftbox5": if(wins1[4]!=0)laynum(id);wins1[4]=x;leftremove();break;
        case "leftbox6": if(wins1[5]!=0)laynum(id);wins1[5]=x;leftremove();break;
        case "leftbox7": if(wins1[6]!=0)laynum(id);wins1[6]=x;leftremove();break;
        case "leftbox8": if(wins1[7]!=0)laynum(id);wins1[7]=x;leftremove();break;
        case "leftbox9": if(wins1[8]!=0)laynum(id);wins1[8]=x;leftremove();break;
        default: layNum(id);
    }
    refresh();
    if(count1!=9)
    lay=-1;
    }
    if(lay==-1){
        aithrow();
        rightremove();
        lay=0;
    }
    refresh();//根据数组中的元素更新图片
    allScore();//记录分数
}

function refresh() //遍历两个数组，若元素不等于0则放置骰子图片，若元素等于0则放置原始图片
{
    count1 = 0; //用于记录左边放置的骰子数，由于每次操作都要遍历，故先清零
    count2 = 0; //用于记录右边放置的骰子数
    for(var j=0;j<9;j++) //遍历左边的数组
    {
        if(wins1[j]!=0) //非零元素则放置对应骰子图片
        {
            layImg("leftbox"+(j+1),wins1[j]);
            count1++;
        }
        else //零元素则放置原始图片
        {
            document.getElementById("leftbox"+(j+1)).src = diceArrays[0];
           // count1--;
        }
    }
    //以上是左边的遍历更新操作
    judgeend(count1); //遍历结束后便判断是否结束，因为每次refresh都会有一边的图片增多，所以每一边都要单独判断一次。
    for(var k=0;k<9;k++)
    {
        if(wins2[k]!=0)
        {
            layImg("rightbox"+(k+1),wins2[k]);
            count2++;
        }
        else
        {
            document.getElementById("rightbox"+(k+1)).src = diceArrays[0];
           // count2--;
        }
        judgeend(count2);
    }
}

function leftremove() //左边放置骰子之后判断右边同行的元素中是否有与之相同的元素，若有，则将右边对应元素清零
{  
        for(var j=0;j<9;j++)
        {
            if(j<3)
                if(wins2[j]==wins1[0]||wins2[j]==wins1[1]||wins2[j]==wins1[2]) //第一行判断
                {
                    wins2[j]=0;
                }
            if(j>=3&&j<6)
                if(wins2[j]==wins1[3]||wins2[j]==wins1[4]||wins2[j]==wins1[5]) //第二行判断
                {
                    wins2[j]=0;
                }
            if(j>=6&&j<9)
                if(wins2[j]==wins1[6]||wins2[j]==wins1[7]||wins2[j]==wins1[8]) //第三行判断
                {
                    wins2[j]=0;
                }       
        }
   }
function rightremove()
{
    for(var j=0;j<9;j++)
    {
        if(j<3)
            if(wins1[j]==wins2[0]||wins1[j]==wins2[1]||wins1[j]==wins2[2]) //第一行判断
            {
                wins1[j]=0;
            }
        if(j>=3&&j<6)
            if(wins1[j]==wins2[3]||wins1[j]==wins2[4]||wins1[j]==wins2[5]) //第二行判断
            {
                wins1[j]=0;
            }
        if(j>=6&&j<9)
            if(wins1[j]==wins2[6]||wins1[j]==wins2[7]||wins1[j]==wins2[8]) //第三行判断
            {
                wins1[j]=0;

            }       
    }
}

function allScore() //统计分数的函数
{
    wins[0] = 0; //左边的总分
    wins[1] = 0; //右边的总分
    for(var j = 0;j < 3;j++)
    {
    /*计算wins1*/
        if(wins1[j*3] == wins1[j*3 + 1] &&wins1[j*3] == wins1[j*3 + 2])//三个相等，就算0也算，不影响
        {
            wins[0] += wins1[j*3] * 9;
        }
        else if(wins1[j*3] == wins1[j*3 + 1] || wins1[j*3] == wins1[j*3+2]||wins1[j*3+1] == wins1[j*3+2])//同行任意两个相等
        {
            if(wins1[j*3] == wins1[j*3 + 1])
            {
                wins[0] += wins1[j*3] * 4 + wins1[j*3 + 2];
            }
            else if(wins1[j*3] == wins1[j*3+2])
            {
                wins[0] += wins1[j*3] * 4 + wins1[j*3 + 1];
            }
            else
            {
                wins[0] += wins1[j*3 + 1] * 4 + wins1[j*3];
            }
        }
        else//都不相等
        {
            wins[0] += wins1[j*3] + wins1[j * 3+1]+ wins1[j*3 + 2];
        }
    }
    for(var j = 0;j < 3;j++)
    {
    /*计算wins2*/
        if(wins2[j*3] == wins2[j*3 + 1] &&wins2[j*3] == wins2[j*3 + 2])//三个相等，就算0也算，不影响
        {
            wins[1] += wins2[j*3] * 9;
        }
        else if(wins2[j*3] == wins2[j*3 + 1] || wins2[j*3] == wins2[j*3+2]||wins2[j*3+1] == wins2[j*3+2])//同行任意两个相等
        {
            if(wins2[j*3] == wins2[j*3 + 1])
            {
                wins[1] += wins2[j*3] * 4 + wins2[j*3 + 2];
            }
            else if(wins2[j*3] == wins2[j*3+2])
            {
                wins[1] += wins2[j*3] * 4 + wins2[j*3 + 1];
            }
            else
            {
                wins[1] += wins2[j*3 + 1] * 4 + wins2[j*3];
            }
        }
        else//都不相等
        {
            wins[1] += wins2[j*3] + wins2[j * 3+1]+ wins2[j*3 + 2];
        }
    }
    document.getElementById("leftscore").innerHTML = wins[0]; //利用id将左边总分放入左边计分的span中
    document.getElementById("rightscore").innerHTML = wins[1]; //利用id将右边总分放入右边计分的span中
}

function judgeend(count) //判断是否结束
{
    if(count==9) //某边的骰子数量达到九，游戏结束
    {
        allScore();//重新统计一次分数才不会出错，否则会出现游戏结果是最后一次放置之前的
        document.getElementById('background').style.display="block"; //将弹窗设置为可见 
        if(wins[0]>wins[1]) //左边总分大于右边
        {
            document.getElementById("whowin").innerHTML = "左方赢了！";
            return;
        }
        else if(wins[0]==wins[1]) //两边分数一致
        {
            document.getElementById("whowin").innerHTML = "平局！";
            return;
        }
        else if(wins1[0]<wins[1]) //左边总分小于右边
        {
            document.getElementById("whowin").innerHTML = "右方赢了！";
            return;
        }
    }
}


function aithrow() //电脑自己抛骰子
{
    y = Math.floor((Math.random() * 10) + 1) % 6 + 1;//产生一个随机数
    var temp=aiplay();
}

function aiplay() //电脑的逻辑
{
    var local = 0;//要返回的位置，给人提示的作用。
    for(var k = 0;k <= 2;k++)//第一种情况，其中一行666，正好我摇出了6
    {
        if(wins1[k*3] == wins1[k*3 + 1] && wins1[k*3] == wins1[k*3 + 2] && wins1[k*3] == y && y > 2)//炸胡，因为要等于y，所以不用判断是否有等于0
        {
            if(wins2[k*3] == 0)
            {
                wins2[k*3] = y;
                local = k*3;
               // count1--;
                return local;//它的落点一旦确定就return结束这个函数。
            }
            else if(wins2[k*3 + 1] == 0)
            {
                wins2[k*3 + 1] = y;
                local = k*3 + 1;
              //  count1--;
                return local;
            }
            else if(wins2[k*3 + 2] == 0)//一定要有这个判断，不然会把原本就有的给替换掉。
            {
                wins2[k*3 + 2] = y;
                local = k*3 + 2;
               //count1--;
                return local;
            }
        }
    }
    for(var k = 0;k <= 2;k++)//221||212||122摇出了2，上一个for函数已经排除了三个相等的情况
    {
        if(y > 2 && (wins1[k*3] == wins1[k*3+1] && y == wins1[k*3])||(wins1[k*3] == wins1[k*3+2] && y == wins1[k*3])||(wins1[k*3+2] == wins1[k*3+1] && y == wins1[k*3+1]))
        {
            if(wins2[k*3] == 0)
            {
                wins2[k*3] = y;
                local = k*3;
              //  count1--;
                return local;
            }
            else if(wins2[k*3 + 1] == 0)
            {
                wins2[k*3 + 1] = y;
                local = k*3 + 1;
              //  count1--;
                return local;
            }
            else if(wins2[k*3 + 2] == 0)
            {
                wins2[k*3 + 2] = y;
                local = k*3 + 2;
              // count1--;
                return local;
            }
        }
    }
    for(var k = 0;k <= 2;k++)//全散或者全空
    {
        for(var j =0 ;j < 3;j++)
        {
            if((y == wins2[j*3] || y == wins2[j*3 + 1] || y == wins2[j*3 + 1]) && y > 2)//凑两个或者三个都行，y要大于2
            {
                if(wins2[j * 3] == 0)
                {
                    local = wins2[j * 3];
                    wins2[j * 3] = y;
                    return local;
                }
                else if(wins2[j*3 + 1] == 0)
                {
                    local = wins2[j * 3 + 1];
                    wins2[j * 3 + 1] = y;
                    return local;
                }
                else if(wins2[j*3 + 2] == 0)
                {
                    local = wins2[j * 3 + 2];
                    wins2[j * 3 + 2] = y;
                    return local;
                }
            }
        }
        while(1){
        var tion = Math.floor((Math.random() * 10) + 1) % 9;
        if(wins2[tion] == 0)
        {
            wins2[tion] = y;
            local = tion;
          //  count1--;
            return local;
        }
        
    }
}
}