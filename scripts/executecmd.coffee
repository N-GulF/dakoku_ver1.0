

module.exports = (robot) ->
  # ローカルバッチ実行
	robot.respond /出社/i, (msg) ->
		msg.reply "いってこいw"
		@exec = require('child_process').exec
		command = "osascript /Users/Shota/Desktop/打刻script.scpt"
		msg.send "Command: #{command}"
		@exec command, (error, stdout, stderr) ->
      msg.reply "ダメやんw" if error?
      msg.reply "出社させといたw" if stdout?
      msg.reply "えwwもうしてんじゃんw" if stderr?

	robot.respond /退社/i, (msg) ->
		msg.reply "おつかれw"
		@exec = require('child_process').exec
		command = "C:\\Users\\works\\punchbat\\PunchOut.bat"
		msg.send "Command: #{command}"
		@exec command, (error, stdout, stderr) ->
	    msg.reply "ダメやんw" if error?
	    msg.reply "退社させといたw" if stdout?
	    msg.reply "えwwダメやんw" if stderr?
	    
	robot.respond /test/i, (msg) ->
		msg.reply "あにきテスト"
		@exec = require('child_process').exec
		command = "osascript /Users/Shota/dakoku_ver1.0/出社バッチ.scpt"
		msg.send "Command: #{command}"
		@exec command, (error, stdout, stderr) ->
	    msg.reply "ダメやんw" if error?
	    msg.reply "退社させといたw" if stdout?
	    msg.reply "えwwダメやんw" if stderr?
