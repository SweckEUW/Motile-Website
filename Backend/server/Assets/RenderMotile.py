import bpy,sys,json

argv = sys.argv
argv = argv[argv.index("--") + 1:]
settings = json.loads(argv[0])

def changeColor(mesh,color):
    def recurse(mesh,color):
        if mesh.active_material:
            material = mesh.active_material
            if "Principled BSDF" in material.node_tree.nodes:
                principled = material.node_tree.nodes["Principled BSDF"]
                principled.inputs["Base Color"].default_value = tuple(int(color[i:i + 2], 16) / 255. for i in (1, 3, 5)) + (1,)
        for child in mesh.children:
            recurse(child,color)
    recurse(mesh,color)

for component in settings["components"]:
    if "position" in component and component["position"]:
        componentNode = bpy.data.objects[component["name"]]

        # Clone Dummys
        if component["name"] == "KleinerDummy" or component["name"] == "GroßerDummy":
            componentNode = bpy.data.objects.new(component["name"], componentNode.data)
            bpy.context.collection.objects.link(componentNode)
        
        # Clone and Place Bridges
        bridge = bpy.data.objects[component["bridge"]["name"]]
        bridge = bpy.data.objects.new(component["bridge"]["name"], bridge.data)
        bpy.context.collection.objects.link(bridge)
        bridge.scale = (component["bridge"]["scale"]["x"], component["bridge"]["scale"]["z"], 1)
        if component["bridge"]["name"].split("_")[1] == "m":
            bridge.location = ((component["position"]["_x"] + 11)/1000 , component["position"]["_z"]/1000, 0.0018)
        elif component["bridge"]["name"] == "special2_l":
            bridge.location = (-0.035, -0.045083, 0.0018)
        else:
            bridge.location = (component["position"]["_x"]/1000, component["position"]["_z"]/1000, 0.0018)
            
        # Reposition
        componentNode.location = (component["position"]["_x"]/1000, component["position"]["_z"]/1000, 0.0018)

        # Coloring
        if component["name"] != "KleinerRückdisplay" and component["name"] != "GroßerRückdisplay":
            changeColor(componentNode,component["color"])

# Place Tablet/Phone
if settings["isTablet"]:
    bpy.data.objects['Tablet'].location = (0, 0, 0)
    bpy.data.objects['Camera'].location = (0, 0, 0.28243)
    bpy.context.scene.render.resolution_x = 200
    bpy.context.scene.render.resolution_y = 280
else:
    bpy.data.objects['Phone'].location = (0, 0, 0)

# Change Rendering filepath
bpy.context.scene.render.filepath = settings["exportPath"]


print("Starting Rendering!")
bpy.ops.render.render(write_still=True)
print("Rendering Done!")

print("Quit")
# bpy.ops.wm.quit_blender()