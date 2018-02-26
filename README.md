# MC_dynmap-log-archiver
Minecraftのdynmapのチャットログを監視し，ログを保管する．


# バグなど
わけのわからんjson拾ってくると落ちることがある．


undefined:1  
<html>  
^  
  
SyntaxError: Unexpected token < in JSON at position 0     
    at JSON.parse (<anonymous>)     
    at IncomingMessage.res.on (/home/xxx/Documents/xxxxxxxx/xxxxxxxx.js:13:20)     
    at IncomingMessage.emit (events.js:165:20)    
    at endReadableNT (_stream_readable.js:1101:12)    
    at process._tickCallback (internal/process/next_tick.js:152:19)    
