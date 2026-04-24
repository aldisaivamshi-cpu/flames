function removeSpaces(str) {
    return str.replace(/\s+/g, '');
}

alert("THIS PAGE IS ONLY FOR ENTERTAINMENT PURPOSE. NOT SERIOUS");

function calculateFLAMES() {
    let name1Input = document.getElementById('name1').value.trim().toLowerCase();
    let name2Input = document.getElementById('name2').value.trim().toLowerCase();
    const resultElement = document.getElementById('result');
    const btn = document.querySelector('.primary-btn');

    // Reset animation
    resultElement.classList.remove('pop-in');
    void resultElement.offsetWidth; // Trigger reflow

    if (!name1Input || !name2Input) {
        resultElement.innerText = "Please enter both names.";
        resultElement.style.color = "#ca9ea2ff";
        resultElement.classList.add('pop-in');
        return;
    }

    // UX Animation Start (Simulate processing)
    btn.classList.add('is-loading');
    resultElement.innerHTML = "";
    
    setTimeout(() => {
        // Remove spaces using the provided function
        let n1 = removeSpaces(name1Input);
        let n2 = removeSpaces(name2Input);

        // Cancel common characters
        let arr1 = n1.split('');
        let arr2 = n2.split('');

        for (let i = 0; i < arr1.length; i++) {
            for (let j = 0; j < arr2.length; j++) {
                if (arr1[i] === arr2[j] && arr1[i] !== '0') {
                    arr1[i] = '0';
                    arr2[j] = '0';
                    break;
                }
            }
        }

        // Count remaining characters
        let count = 0;
        for (let ch of arr1) {
            if (ch !== '0') count++;
        }
        for (let ch of arr2) {
            if (ch !== '0') count++;
        }

        btn.classList.remove('is-loading');

        if (count === 0) {
            resultElement.innerText = "Names are identical!";
            resultElement.style.color = "#ffa502";
            resultElement.classList.add('pop-in');
            return;
        }

        // FLAMES logic
        let flames = ['F', 'L', 'A', 'M', 'E', 'S'];
        let n = flames.length;
        let index = 0;

        while (n > 1) {
            index = (index + count - 1) % n;
            flames.splice(index, 1);
            n--;
        }

        // Output result
        let result = "";
        let color = "#fff";

        switch (flames[0]) {
            case 'F':
                result = "Friends";
                color = "#4cc9f0"; // Cyan
                break;
            case 'L':
                result = "Love";
                color = "#f72585"; // Pink
                break;
            case 'A':
                result = "Affection";
                color = "#ff9e00"; // Orange
                break;
            case 'M':
                result = "Marriage";
                color = "#7209b7"; // Purple
                break;
            case 'E':
                result = "Enemy";
                color = "#ef233c"; // Red
                break;
            case 'S':
                result = "Siblings";
                color = "#4361ee"; // Blue
                break;
        }

        resultElement.innerHTML = `Result: <strong style="color: ${color};">${result}</strong>`;
        resultElement.classList.add('pop-in');
    }, 1200); // 1.2s delay for suspenseful UX
}

// Water Ripple Effect on Mouse Move
let lastRippleTime = 0;
document.addEventListener('mousemove', function(e) {
    const now = Date.now();
    // Throttle to 1 ripple every 50ms for performance and aesthetics
    if (now - lastRippleTime < 50) return; 
    lastRippleTime = now;

    const ripple = document.createElement('div');
    ripple.className = 'water-ripple';
    ripple.style.left = e.clientX + 'px';
    ripple.style.top = e.clientY + 'px';
    
    document.body.appendChild(ripple);
    
    // Cleanup the ripple element after the animation finishes
    setTimeout(() => {
        ripple.remove();
    }, 1000);
});
