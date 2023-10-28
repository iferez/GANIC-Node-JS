import SandwichModel from './../models/sandwich.model'

const obtenerTodosLosSandwiches = async (): Promise<SandwichModel[] | undefined> => {
  try {
    await SandwichModel.sync()
    return await SandwichModel.findAll()
  } catch (error) {
    console.log(error)
    throw error
  }
}

const obtenerPorId = async (id: number): Promise<SandwichModel | null> => {
  const sandwich = await SandwichModel.findByPk(id)
  return sandwich
}
const agregarSandwich = async (sandwichData: any): Promise<void> => {
  try {
    const sandwich = SandwichModel.build(sandwichData)
    await sandwich.save()
  } catch (error) {
    throw new Error()
  }
}

export { obtenerTodosLosSandwiches, obtenerPorId, agregarSandwich }
