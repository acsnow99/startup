function Rules() {
    return (
        <main>
        <div className="rules_text">
            <p className="rules_bold">
            As an RPG hero, your job is to exterminate monsters. 
            You will fight one at a time, gaining precious gold as you slay each one.
            </p>
            <ul className="rules_list">
            <li>
                Click "Fight!" to attack the monster. There is a chance you will get hurt also!
            </li>
            <li>
                Click "Heal!" to heal using your stored health potions.
            </li>
            <li>
                Click "Run!" to spawn a new monster and gain an extra health potion. 
                Running costs gold, so only use this when necessary.
            </li>
            </ul>
            <p>
            As you fight monsters, you will see the progress of other heroes! 
            Your heroic feats will also be visible to other heroes. 
            </p>
            <p className="rules_bold">
            Good luck!
            </p>
        </div>
        </main>
    );
}

export {Rules};