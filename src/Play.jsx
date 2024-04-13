import { init_display } from "./play_init";
import { player_run, player_heal, player_attack } from "./game_buttons";
function Play() {
  init_display();
    return (
      <main>
        <div className="game_images_and_log_and_username_container">
          <div className="game_images_and_buttons_and_username_container">
            <div className="game_images_and_buttons_container">
              <div className="game_images_hearts_container" id="health_container">
                <div className="game_images_hearts_container_internal player_hearts" id="player_health">
                  <img src="images/heart_filled.png" className="heart_image" />
                  <img src="images/heart_filled.png" className="heart_image" />
                  <img src="images/heart_filled.png" className="heart_image" />
                </div>

                <div className="game_images_hearts_container_internal" id="enemy_health">
                  <img src="images/heart_filled.png" className="heart_image" />
                  <img src="images/heart_filled.png" className="heart_image" />
                  <img src="images/heart_filled.png" className="heart_image" />
                  <img src="images/heart_filled.png" className="heart_image" />
                  <img src="images/heart_filled.png" className="heart_image" />
                </div>
              </div>
              <div className="game_images_container_internal">
                <img src="images/hero.png" className="hero_image" />
                <img src="images/enemy.jpg" id="monster_image" className="monster_image" />
              </div>
              <div className="filler_buttons"></div>
              <div className="game_buttons_container">
                <button type="button" id="game_button_fight" onClick={player_attack} className="game_button_fight btn btn-primary btn-lg">Fight!</button>
                <div className="game_buttons_container_internal">
                  <button type="button" id="game_button_heal" onClick={player_heal} className="game_button_heal btn btn-success">
                    <div id="healing_display">Heal! 0</div>
                    <img className="icon_heal" src="images/icon_heal_empty.png"/>
                  </button>
                  <div>
                    <button type="button" id="game_button_run" onClick={player_run} className="game_button_run btn btn-secondary btn-sm">
                      +1<img className="icon_heal" src="images/icon_heal_empty.png"/>
                      <div id="run_display">Run!</div>
                      <img className="icon_gold" src="images/icon_gold.png"/>-200
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="username_and_score_container">
              <div className="username_and_score_container_internal" id="username_and_score">
              </div>
            </div>
          </div>
          <div className="game_log_container" id="game_log_container">
            <div>Adventure Log:</div>
          </div>
        </div>
      </main>
    )
}


export { Play };