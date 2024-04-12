import { init_display } from "./play_init";
import { player_run, player_heal, player_attack } from "./game_buttons";
import { activate_receive_websocket } from "./game_socket";

function Play() {
  init_display();
  activate_receive_websocket();
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
              <div className="game_buttons_container">
                <button type="button" id="game_button_fight" onClick={player_attack} className="game_button_fight btn btn-primary btn-lg">Fight!</button>
                <div className="game_buttons_container_internal">
                  <button type="button" id="game_button_heal" onClick={player_heal} className="game_button_heal btn btn-success"><div id="healing_display">Heal! 0</div></button>
                  <button type="button" id="game_button_run" onClick={player_run} className="game_button_run btn btn-secondary btn-sm"><div id="run_display">Run!</div></button>
                </div>
              </div>
            </div>
            <div className="username_and_score_container">
              <div className="username_and_score_container_internal" id="username_and_score">
              </div>
            </div>
          </div>
          <div className="game_log_container" id="game_log_container">
          </div>
        </div>
      </main>
    )
}


export { Play };