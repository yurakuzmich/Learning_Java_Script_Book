	// выводит сообщение на странице через 5 секунд
	setTimeout(wakeUpUser, 5000);

	function wakeUpUser() {
		alert ("Ты собираешься вечно торчать на этой странице!?")
	}

	// вывод информации в консоль
	var message = "Hello,";
	var name = "Artur"
	console.log(message + ' ' + name);

	// вызов функции
	printTextOnPage();

	// объявление функции
	function printTextOnPage() {
		
		var scoops = 5;

		while (scoops > 0) {
			// вывод текста на странице браузера
			document.write("<b>Просто вывод текста!</b><br><br>");
			setTimeout(5000);
			scoops -= 1;
		}

		// вывод текста на странице
		document.write("Вывод текста закончился!")

	}
