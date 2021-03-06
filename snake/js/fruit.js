/* global kijs */

// --------------------------------------------------------------
// snake.Fruit
// --------------------------------------------------------------
kijs.Class.define('snake.Fruit', {
    type: 'regular',     // regular, abstract, static oder singleton (default:regular)
    xtypes: [],          // Alternative Klassennamen zur Verwendung als xtype in Config-Objekten
    events: [],          // Namen der Events dieser Klasse

    // --------------------------------------------------------------
    // CONSTRUCTOR
    // --------------------------------------------------------------
    construct: function(spielfeld) {
        this.base(arguments);
        this.spielfeld = spielfeld;
        this.dom = spielfeld.spielfeld;
        this.context = this.dom.getContext('2d');
        this.music = new Audio('../sounds/fruit.mp3');
        this.replace();
    },

    // --------------------------------------------------------------
    // MEMBERS
    // --------------------------------------------------------------
    members: {
        context: null,
        dom: null,
        height: 56,
        music: null,
        width: 52,
        x: null,
        y: null,


        // PUBLIC
        checkCollision(snake) {
            if ((snake.snakeCircles[0].x<=this.x+this.width && snake.snakeCircles[0].x+snake.snakeCircleWidth>=this.x) &&
                    (snake.snakeCircles[0].y<=this.y+this.height && snake.snakeCircles[0].y+snake.snakeCircleHeight>=this.y)) {
                this.replace();
                this.music.play();
                // Frucht neu platzieren wenn auf Hindernis
                for (i = 0; i < this.spielfeld.obstacles.length; i++) {
                    if ((this.x<=this.spielfeld.obstacles[i].x+this.spielfeld.obstacles[i].width && this.x+this.width>=this.spielfeld.obstacles[i].x) &&
                            (this.y<=this.spielfeld.obstacles[i].y+this.spielfeld.obstacles[i].height && this.y+this.height>=this.spielfeld.obstacles[i].y)) {
                        this.replace();
                        i = 0;
                    }
                }
                return true;
            } else {
                return false;
            }
        },
        
        paint: function() {
            var img = new Image();
            img.src = "../pictures/cherries.png";

            // Fruit zeichnen
            this.context.drawImage(img, this.x, this.y, this.width, this.height);
        },

        replace: function() {
            var minx = 0;
            var maxx = this.spielfeld.width - (this.width * 2);
            this.x = Math.floor(Math.random() * (maxx - minx)) + minx;

            var miny = 0;
            var maxy = this.spielfeld.height - (this.height * 2);
            this.y = Math.floor(Math.random() * (maxy - miny)) + miny;
        }
    },

    // --------------------------------------------------------------
    // DESTRUCTOR
    // --------------------------------------------------------------
    destruct: function() {
        this.base(arguments);
    }
});