local library = loadstring(game:HttpGet("https://github.com/GoHamza/AppleLibrary/blob/main/main.lua?raw=true"))()


local window = library:init("3-2-1-Blast off! By Max.", true, Enum.KeyCode.End, true)

window:Divider("Скрипты")

local sectionA = window:Section("Телепорты к сундукам")

sectionA:Divider("Телпорты")

local sectionB = window:Section("Телепорты к сундукам 2")

sectionB:Divider("Телпорты 2")

sectionA:Button("Облака (150).", function()
   game.Players.LocalPlayer.Character.HumanoidRootPart.CFrame = CFrame.new(43.75640869140625, 215.88108825683594, -8.427456855773926)
end)

sectionA:Button("Паркур(690).", function()
   game.Players.LocalPlayer.Character.HumanoidRootPart.CFrame = CFrame.new(0.6863994002342224, 806.8809204101562, -2.1618707180023193)
end)

sectionA:Button("Луна (1500).", function()
   game.Players.LocalPlayer.Character.HumanoidRootPart.CFrame = CFrame.new(6.123477935791016, 1430.3807373046875, 2.187380075454712)
end)

sectionA:Button("Пчёлы (3150).", function()
   game.Players.LocalPlayer.Character.HumanoidRootPart.CFrame = CFrame.new(6.4716057777404785, 3131.2470703125, -33.93153381347656)
end)

sectionA:Button("Лунята (5000)", function()
   game.Players.LocalPlayer.Character.HumanoidRootPart.CFrame = CFrame.new(-18.592458724975586, 5016.33984375, -52.524269104003906)
end)

sectionA:Button("Тёмная материя (6700)", function()
   game.Players.LocalPlayer.Character.HumanoidRootPart.CFrame = CFrame.new(66.83165740966797, 6816.89453125, -1.5664030313491821)
end)

sectionA:Button("Тёмная материя 1 (6700)", function()
   game.Players.LocalPlayer.Character.HumanoidRootPart.CFrame = CFrame.new(-12.849774360656738, 6816.89453125, 42.10836410522461)
end)

sectionA:Button("Тёмная материя 2 (6700)", function()
   game.Players.LocalPlayer.Character.HumanoidRootPart.CFrame = CFrame.new(-92.8126449584961, 6816.89453125, -2.046076536178589)
end)

sectionA:Button("Тёмная материя 3 (6700)", function()
   game.Players.LocalPlayer.Character.HumanoidRootPart.CFrame = CFrame.new(-21.862606048583984, 6816.89453125, -49.855621337890625)
end)

sectionA:Button("Астероиды (8500-8800)", function()
   game.Players.LocalPlayer.Character.HumanoidRootPart.CFrame = CFrame.new(8.32214069366455, 8622.9892578125, -7.40540075302124)
end)

sectionA:Button("Марс (11100)", function()
   game.Players.LocalPlayer.Character.HumanoidRootPart.CFrame = CFrame.new(-41.437286376953125, 11283.8466796875, 0.3132277727127075)
end)

sectionB:Button("Шахта с кристалами (15100)", function()
   print("Просто шахта")
end)

sectionB:Button("Шахта с кристалами (Зелёный) (15100)", function()
   game.Players.LocalPlayer.Character.HumanoidRootPart.CFrame = CFrame.new(-66.33045196533203, 15236.4951171875, 7.733983516693115)
end)

sectionB:Button("Шахта с кристалами (Красный) (15100)", function()
   game.Players.LocalPlayer.Character.HumanoidRootPart.CFrame = CFrame.new(29.825546264648438, 15192.9951171875, -64.50042724609375)
end)

sectionB:Button("Шахта с кристалами (Синий) (15100)", function()
   game.Players.LocalPlayer.Character.HumanoidRootPart.CFrame = CFrame.new(-2.7872865200042725, 15069.591796875, 11.519830703735352)
end)

sectionB:Button("Лунные ягоды (18000)", function()
   game.Players.LocalPlayer.Character.HumanoidRootPart.CFrame = CFrame.new(-7.9413275718688965, 18410.9609375, 2.1779398918151855)
end)

sectionB:Button("Паркур с плитами (Начало) (22300)", function()
  game.Players.LocalPlayer.Character.HumanoidRootPart.CFrame = CFrame.new(-0.6189672946929932, 22539.4921875, 55.73550033569336) 
end)

sectionB:Button("Паркур с плитами (Конец) (22300)", function()
   game.Players.LocalPlayer.Character.HumanoidRootPart.CFrame = CFrame.new(-0.6813414096832275, 22539.4921875, -77.39694213867188)
end)

sectionB:Button("Звёзды (27600)", function()
   game.Players.LocalPlayer.Character.HumanoidRootPart.CFrame = CFrame.new(-45.33205032348633, 27961.5625, -7.8743157386779785)
end)
