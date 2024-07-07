const participants = [
    "Let Me Blow Ya Mind - Eve, Gwen Stefani, Stevie J", "Hit 'Em Up Style - Blu Cantrell", "Ghetto Superstar - ODB, Mya, Pras", "Me & U - Cassie",
    "What's Luv - Fat Joe, Ja Rule, Ashanti", "Lady Marmalade - Xtina, Lil Kim, Mya, Pink", "No Scrubs - TLC", "Foolish - Ashanti",
    "Where My Girls At - 702", "The Boy Is Mine - Brandy, Monica", "No More - 3LW", "Try Again - Aaliyah",
    "Are You That Somebody - Aaliyah", "Case of The Ex - Mya", "Let It Go - Keyshia Cole, Missy Elliot, Lil Kim", "Love Like This - Faith Evans"

];

// Function to shuffle participants
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Shuffle participants before starting the tournament
const shuffledParticipants = shuffle([...participants]);

let rounds = [shuffledParticipants];

function createBracket() {
    const bracketDiv = document.getElementById('bracket');
    bracketDiv.innerHTML = '';

    rounds.forEach((round, roundIndex) => {
        const roundDiv = document.createElement('div');
        roundDiv.classList.add('round');

        round.forEach((participant, i) => {
            if (i % 2 === 0) {
                const matchDiv = document.createElement('div');
                matchDiv.classList.add('match');

                const button1 = document.createElement('button');
                button1.textContent = participant;
                button1.id = `round-${roundIndex}-match-${i}-button1`;
                button1.addEventListener('click', () => selectWinner(roundIndex, i));

                const button2 = document.createElement('button');
                button2.textContent = round[i + 1];
                button2.id = `round-${roundIndex}-match-${i}-button2`;
                button2.addEventListener('click', () => selectWinner(roundIndex, i + 1));

                matchDiv.appendChild(button1);
                matchDiv.appendChild(createConnector());
                matchDiv.appendChild(button2);
                roundDiv.appendChild(matchDiv);
            }
        });

        bracketDiv.appendChild(roundDiv);
    });
}

function createConnector() {
    const connectorDiv = document.createElement('div');
    connectorDiv.classList.add('connector');

    const verticalConnector = document.createElement('div');
    verticalConnector.classList.add('connector', 'vertical');

    const horizontalConnector = document.createElement('div');
    horizontalConnector.classList.add('connector', 'horizontal');

    connectorDiv.appendChild(verticalConnector);
    connectorDiv.appendChild(horizontalConnector);
    connectorDiv.appendChild(verticalConnector.cloneNode());

    return connectorDiv;
}

function selectWinner(roundIndex, participantIndex) {
    const currentRoundParticipants = rounds[roundIndex];
    const winner = currentRoundParticipants[participantIndex];
    const nextRound = rounds[roundIndex + 1] || [];
    nextRound.push(winner);

    if (!rounds[roundIndex + 1]) {
        rounds.push(nextRound);
    } else {
        rounds[roundIndex + 1] = nextRound;
    }

    // Disable both participants in the match
    const matchIndex = Math.floor(participantIndex / 2) * 2;
    document.getElementById(`round-${roundIndex}-match-${matchIndex}-button1`).disabled = true;
    document.getElementById(`round-${roundIndex}-match-${matchIndex}-button2`).disabled = true;

    if (nextRound.length === 1 && roundIndex === 3) {
        alert(`The champion is ${nextRound[0]}`);
    } else {
        createBracket();
    }
}

createBracket();

