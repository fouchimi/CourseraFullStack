var target_color;
var target_index;
var guess_input_text;
var finished = false;
var guesses = 0;
var showOnce = true;
var colors =["blue", "cyan", "gold", "green", "magenta",
             "orange", "red", "white", "yellow"];
var bodyTag;

function do_game(){
  var random_number = Math.random() * 9;
  var random_number_integer = Math.floor(random_number);
  target = random_number_integer;
  if(showOnce){
    target_color = colors[target];
    alert("I am thinking of this color: " + target_color);
    target_index = colors.indexOf(target_color);
    showOnce = false;
  }
  var colorString="";

  for(var i=0; i < colors.length; i++){
    colorString += colors[i];
  }

  while(!finished){
    guess_input_text = prompt("I am thinking of one of these colors: " +
                              colorString + "\n\n" +
                              "What color am I thinking of?");
    guess_input_text = guess_input_text.toLowerCase();
    guesses += 1;
    finished = check_guess();
  }

}

function check_guess(){
  if(colors.indexOf(guess_input_text) == -1){
    alert("Sorry, I don't recognize your color.\n\n" +
          "Please try again.");
    return false;
  }
  if(guess_input_text > target_color) {
    alert("Sorry, your guess is not correct.\n\n" +
          "Hint: your color is alphabetically higher than mine.\n\n" +
          "Please try again.");
    return false;
  }
  if(guess_input_text < target_color) {
    alert("Sorry, your guess is not correct.\n\n" +
          "Hint: your color is alphabetically lower than mine.\n\n" +
          "Please try again.");
    return false;
  }

  alert("Congratulations! You have guessed the color!.\n\n"+
        "It took you " + guesses + " guesses to finish the game!\n\n" +
        "You can see the colour in the background.");
  bodyTag = document.getElementsByTagName("body")[0];
  bodyTag.style.background=target_color;
  return true;
}
