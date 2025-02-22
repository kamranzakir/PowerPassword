
        document.getElementById('generate-button').addEventListener('click', generateStrongPassword);
        document.getElementById('regenerate-button').addEventListener('click', generateStrongPassword);
        document.getElementById('copy-button').addEventListener('click', copyToClipboard);

        const lengthSlider = document.getElementById('password-length');
        const lengthValueDisplay = document.getElementById('length-value');

        lengthSlider.addEventListener('input', () => {
            lengthValueDisplay.textContent = lengthSlider.value;
        });

        function generateStrongPassword() {
            const significantName = document.getElementById('weak-password').value;
            let significantNumber = document.getElementById('significant-number').value;
            const desiredLength = parseInt(lengthSlider.value);
            const avoidSimilar = document.getElementById('avoid-similar').checked;

            const originalName = significantName;
            const originalNumber = significantNumber;

            const result = strengthenPassword(significantName, significantNumber, desiredLength, avoidSimilar);
            document.getElementById('strong-password-display').textContent = result.password;

            document.getElementById('password-explanation').innerHTML = `<b>Original characters:</b> ${result.originalCombined || ""}<br>${result.explanation}`; // Added this line

            document.getElementById('copy-message').textContent = "";
        }




          function strengthenPassword(significantName, significantNumber, desiredLength, avoidSimilar) {
            const substitutions = {
                'a': ['@', '4', '/\\', 'a'],
                'A': ['@', '4', '/\\', 'A', 'a'],
                'b': ['8', 'B', '6', 'b'],
                'B': ['8', 'b', 'B'],
                'c': ['(', '[', '{', 'c', 'C'],
                'C': ['(', '[', '{', 'C', 'c'],
                'd': ['|)', 'd', 'D'],
                'D': ['|)', 'D', 'd'],
                'e': ['3', '&', 'e', 'E'],
                'E': ['3', '&', 'E', 'e'],
                'f': ['ph', 'f', 'F'],
                'F': ['ph', 'F', 'f'],
                'g': ['9', '&', 'g', 'G'],
                'G': ['9', '&', 'G', 'g'],
                'h': ['#', 'h', 'H'],
                'H': ['#', 'H', 'h'],
                'i': ['1', '!', '|', 'i', 'I'],
                'I': ['1', '!', '|', 'I', 'i'],
                'j': [')', 'j', 'J'],
                'J': [')', 'J', 'j'],
                'k': ['<', 'k', 'K'],
                'K': ['<', 'K', 'k'],
                'l': ['1', '|', 'L', 'l'],
                'L': ['1', '|', 'L', 'l'],
                'm': ['m', 'M', 'lvl'],
                'M': ['M', 'm', 'lvl'],
                'n': ['n', 'N', 'll'],
                'N': ['N', 'n', 'll'],
                'o': ['0', '*', '()', 'o', 'O'],
                'O': ['0', '*', '()', 'O', 'o'],
                'p': ['p', 'P'],
                'P': ['P', 'p'],
                'q': ['q', '9', 'Q'],
                'Q': ['Q', 'q', '9'],
                'r': ['r', 'R'],
                'R': ['R', 'r'],
                's': ['s', '5', 'S', '&', '$'],
                'S': ['S', '5', 's', '&', '$'],
                't': ['+', '7', 't', 'T'],
                'T': ['+', '7', 't', 'T'],
                'u': ['u', 'l_l', 'U'],
                'U': ['U', 'u', 'l_l'],
                'v': ['v', 'V', '/'],
                'V': ['V', 'v', '/'],
                'w': ['w', 'W', 'VV', 'vv'],
                'W': ['W', 'w', 'VV', 'vv'],
                'x': ['x', 'X', '*'],
                'X': ['X', 'x', '*'],
                'y': ['y', 'Y'],
                'Y': ['Y', 'y'],
                'z': ['z', 'Z'],
                'Z': ['Z', 'z'],
                '0': ['&', '()', '0', 'O', 'o'],
                '1': ['!', '|', '1', 'l'],
                '2': ['@', '2', 'Z', 'z'],
                '3': ['#', '3', '&'],
                '4': ['@', '#', '4'],
                '5': ['%', '$', '5'],
                '6': ['^', '&', '6', 'b'],
                '7': ['&', '+', '7', 'T'],
                '8': ['*', '(', '8', 'B'],
                '9': ['(', ')', '9', 'P', 'p'],
                ' ': ['-', '_', ' '],
            };

      if (!significantName) {
  const defaultNames = [
    "James", "John", "Robert", "Michael", "William", "David", "Richard", "Charles", "Joseph", "Thomas",
    "Christopher", "Daniel", "Matthew", "Anthony", "Donald", "Mark", "George", "Paul", "Andrew", "Joshua",
    "Kenneth", "Kevin", "Brian", "Edward", "Ronald", "Timothy", "Steven", "Jeffrey", "Ryan", "Jacob",
    "Gary", "Nicholas", "Eric", "Stephen", "Scott", "Larry", "Henry", "Patrick", "Frank", "Justin",
    "Raymond", "Dennis", "Walter", "Harold", "Albert", "Kyle", "Billy", "Roger", "Joe", "Samuel",
    "Deborah", "Mary", "Patricia", "Linda", "Barbara", "Elizabeth", "Jennifer", "Maria", "Susan", "Margaret",
    "Dorothy", "Virginia", "Sandra", "Carol", "Nancy", "Betty", "Helen", "Ruth", "Sharon", "Michelle",
    "Laura", "Sarah", "Kimberly", "Donna", "Emily", "Ashley", "Amanda", "Melissa", "Jessica", "Lisa",
    "Kelly", "Amy", "Rebecca", "Wendy", "Cynthia", "Angela", "Stephanie", "Evelyn", "Frances", "Carolyn",
    "Christine", "Janet", "Catherine", "Joyce", "Diane", "Julie", "Heather", "Teresa", "Gloria", "Erica",
    "New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose",
    "Austin", "Jacksonville", "Fort Worth", "Columbus", "Indianapolis", "Charlotte", "Detroit", "El Paso", "Memphis", "Boston",
    "Seattle", "Denver", "Washington", "Tampa", "Baltimore", "Atlanta", "St. Louis", "Kansas City", "Milwaukee",
    "Portland", "Orlando", "Las Vegas", "San Juan", "New Orleans", "Cincinnati", "Pittsburgh", "Cleveland", "Minneapolis", "Nashville",
    "Oklahoma City", "Portland", "Salt Lake City", "Hartford", "Buffalo", "Raleigh", "Richmond", "Jackson", "Louisville", "Providence",
    "London", "Paris", "Tokyo", "Rome", "Berlin", "Madrid", "Sydney", "Toronto", "New Delhi", "Beijing",
    "Mumbai", "Mexico City", "Sao Paulo", "Johannesburg", "Dubai", "Singapore", "Hong Kong", "Shanghai", "Moscow", "Seoul",
    "Cairo", "Buenos Aires", "Istanbul", "Karachi", "Dhaka", "Lagos", "Rio de Janeiro", "Kinshasa", "Tianjin", "Guangzhou",
    "Bangkok", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose",
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December",
    "Red", "Green", "Blue", "Yellow", "Orange", "Purple", "Pink", "Black", "White", "Gray",
    "Apple", "Banana", "Orange", "Grape", "Kiwi", "Mango", "Peach", "Plum", "Apricot", "Cherry",
    "Berry", "Melon", "Lemon", "Lime", "Coconut", "Fig", "Date", "Guava", "Papaya",
    "Avocado", "Pomegranate", "Cranberry", "Pineapple", "Strawberry", "Raspberry", "Blueberry", "Blackberry", "Watermelon", "Cantaloupe"
  ];
    significantName = defaultNames[Math.floor(Math.random() * defaultNames.length)];
  }

  if (!significantNumber) {
    significantNumber = new Date().getFullYear();
  } else {
    significantNumber = String(significantNumber);
  }



            let combined = significantName + significantNumber;
            let strongPassword = "";
            let explanation = "";
            let originalCombined = ""; // Store the original combined string

            if (!significantName) {
                const defaultNames = [/* ... your default names array ... */];
                significantName = defaultNames[Math.floor(Math.random() * defaultNames.length)];
                combined = significantName + significantNumber; // Update combined after randomization
                originalCombined = significantName + significantNumber; // Capture the randomized name
            }

            if (!significantNumber) {
                significantNumber = new Date().getFullYear();
                combined = significantName + significantNumber; // Update combined after randomization
                originalCombined = significantName + significantNumber; // Capture the randomized number
            } else {
                significantNumber = String(significantNumber);
                originalCombined = significantName + significantNumber; // Capture the user input number
            }


            for (let i = 0; i < combined.length; i++) {
                const char = combined[i];
                const replacements = substitutions[char];
                if (replacements) {
                    const randomIndex = Math.floor(Math.random() * replacements.length);
                    const replacementChar = replacements[randomIndex];
                    strongPassword += replacementChar;
                    explanation += `${char} → ${replacementChar}, `;
                } else {
                    strongPassword += char;
                }
            }


            

  const randomChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+=-`~[]\{}|;':\",./<>?";
  let availableChars = randomChars;

  if (avoidSimilar) {
    availableChars = availableChars.replace(/[Il1|]/g, ''); // Remove I, l, 1, |
    availableChars = availableChars.replace(/[0O]/g, ''); // Remove 0, O
    availableChars = availableChars.replace(/[{}()\[\]]/g, ''); // Remove curly, round and square brackets
    availableChars = availableChars.replace(/[.,;:'"`]/g, ''); // Remove punctuation
    availableChars = availableChars.replace(/[<>\/\\|]/g, ''); // Remove more symbols
    // Add more removals as needed.  Be careful not to make availableChars too short!
  }

  while (strongPassword.length < desiredLength) {
    const randomIndex = Math.floor(Math.random() * availableChars.length);
    const randomChar = availableChars[randomIndex];
    strongPassword += randomChar;
    explanation += `Added ${randomChar}, `;
  }

  strongPassword = strongPassword.slice(0, desiredLength);
  explanation = explanation.slice(0, -2); // Remove trailing comma and space
  if (explanation.length > 0) {
    explanation = "<b>What did I change:</b> " + explanation;
  }
    return { password: strongPassword, explanation: explanation, originalCombined: originalCombined }; // Return originalCombined
        }



function copyToClipboard() {
  const strongPassword = document.getElementById('strong-password-display').textContent;
  navigator.clipboard.writeText(strongPassword)
    .then(() => {
      document.getElementById('copy-message').textContent = "Copied!";
    })
    .catch(err => {
      document.getElementById('copy-message').textContent = "Failed to copy.";
      console.error('Failed to copy: ', err);
    });
}
