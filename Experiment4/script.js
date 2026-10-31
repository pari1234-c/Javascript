// Normal Function
function checkPalindrome()
{
    try
    {
        let text = document.getElementById("text").value.trim();

        if(text=="")
        {
            throw "Please enter a word.";
        }

        // Arrow Function
        const reverse = str => str.split("").reverse().join("");

        let reversed = reverse(text);

        // Scope
        let message;

        if(text.toLowerCase()==reversed.toLowerCase())
        {
            message="✅ It is a Palindrome";
        }
        else
        {
            message="❌ It is NOT a Palindrome";
        }

        // Closure
        function display()
        {
            return function()
            {
                document.getElementById("result").style.display="block";

                document.getElementById("result").innerHTML=`
                    <h2>${message}</h2>

                    <p><b>Original :</b> ${text}</p>

                    <p><b>Reverse :</b> ${reversed}</p>
                `;
            }
        }

        let show=display();

        show();

    }

    catch(error)
    {
        document.getElementById("result").style.display="block";

        document.getElementById("result").innerHTML=
        `<h2 style="color:red;">${error}</h2>`;
    }
}