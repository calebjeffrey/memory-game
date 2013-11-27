$(document).ready(function(){

    function memory(){
        //tile Constructor function
        function TileItem () {
            this.tile_type;
            this.addToScene = function(id, img) {
                var tileItem = '<li id="'+id+' data-type="'+this.tile_type+'"><div class="tile"><div class="tile-front"></div><div class="tile-back">'+img+'</div</div</li>';
                $('.tiles').append(tileItem);
            };
        }

        //vars
        var tiles = [];
        var tile = new TileItem();
        var num_tiles = 16;
        var openings = 0;
        var attempts = 0;
        var can_pick = true;
        var picked_tiles = [];
        var pictures = [
                                    '<img src="http://i.imgur.com/oTxUcRw.jpg"</img>',
                                    '<img src="http://i.imgur.com/IDHEiz2.jpg"></img>',
                                    '<img src="http://i.imgur.com/ONsXQ9a.jpg"></img>',
                                    '<img src="http://i.imgur.com/sPbp3pp.jpg"></img>',
                                    '<img src="http://i.imgur.com/cZHeXQy.jpg"></img>',
                                    '<img src="http://i.imgur.com/SUFRnQT.jpg"></img>',
                                    '<img src="http://i.imgur.com/3IAM1pP.jpg"></img>',
                                    '<img src="http://i.imgur.com/jIIfUw7.jpg"></img>',
                                    '<img src="http://i.imgur.com/oTxUcRw.jpg"</img>',
                                    '<img src="http://i.imgur.com/IDHEiz2.jpg"></img>',
                                    '<img src="http://i.imgur.com/ONsXQ9a.jpg"></img>',
                                    '<img src="http://i.imgur.com/sPbp3pp.jpg"></img>',
                                    '<img src="http://i.imgur.com/cZHeXQy.jpg"></img>',
                                    '<img src="http://i.imgur.com/SUFRnQT.jpg"></img>',
                                    '<img src="http://i.imgur.com/3IAM1pP.jpg"></img>',
                                    '<img src="http://i.imgur.com/jIIfUw7.jpg"></img>',
                                    ];
        //retrieves an img from pictures array
        function givePic(i) {
            return pictures[i];
        }
        
        //loop that creates tiles                                     
        for(var i=0; i<num_tiles; i++) {
            tiles.push(Math.floor(i/2));
        }

        //loop that randomizes the tiles within array
        var randomize, temp;
        for(var k=num_tiles-1; k>0; k--) {
            randomize = Math.floor(Math.random()*k);
            temp = tiles[k];
            tiles[k] = tiles[randomize];
            tiles[randomize] = temp;
        }

    //loop to place tiles with a random id
        for(var p=0; p<num_tiles; p++) {
            tile = new TileItem();
            var id = Math.floor(Math.random()*300);
            var img = givePic(p);
            tile.tile_type = tiles[p];
            tile.addToScene(id, img);
        }

        //tile click 
        function clicked() {

            if(can_pick) {
                var picked = $(this);
                picked.find('.tile').addClass('flipped');

                //add tiles selected to picked_tiles array
                if(picked_tiles.indexOf(picked) === -1) {
                    picked_tiles.push(picked);
                }

                //checks if 2 tiles have been clicked
                if(picked_tiles.length === 2) {
                    console.log('2 have been picked');
                    //don't allow more tiles to be picked yet
                    can_pick = false;
                    //keep track of attempts
                    attempts++;

                    //checks if 2 tiles match
                    if(picked_tiles[0].find('img').attr('src')===picked_tiles[1].find('img').attr('src')) {
                        console.log(picked_tiles[0]);
                        setTimeout(function(){
                            console.log('match');
                            picked_tiles[0].addClass('disabled');
                            picked_tiles[1].addClass('disabled');
                            picked_tiles = [];
                            can_pick = true;
                            //keeps track of pairs 'opened', if all pairs open, resetGame() is called
                            openings++;
                            if(openings === (num_tiles/2)) {
                                resetGame();
                            }
                        }, 1000);
                        //if 2 selections didn't match
                    } else {
                        setTimeout(function() {
                            console.log('they didnt match');
                            //reset our array that collects the selected tiles
                            picked_tiles[0].children().removeClass('flipped');
                            picked_tiles[1].children().removeClass('flipped');
                            picked_tiles = [];
                            can_pick = true;
                        }, 1000);
                    }
                }
            }
        }
        
        //shuffle DOM list 
        $('ul li').shuffle();
        //add event listeners to tiles
        var elements = $('li');
        for(var q=0; q<elements.length; q++){
            elements[q].addEventListener('click',clicked);
        }

        function resetGame(){
            alert("Congratulations! You took "+attempts+" attempts to complete.");
            $('.tiles').children().remove();
            memory();
        }
    }

    memory();

});