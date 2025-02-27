import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    // const id = req.url.split("/").pop() Extracción directa de la url, tambien es posible.

    const url = new URL(req.url);
    const id = url.pathname.split("/").pop();

    if (!id) {
      return NextResponse.json(
        { ok: false, data: null, message: "ID no proporcionado." },
        { status: 400 }
      );
    }

    const catId = parseInt(id, 10);

    if (isNaN(catId)) {
      return NextResponse.json(
        { ok: false, data: null, message: "ID inválido." },
        { status: 400 }
      );
    }

    const body = await req.json();
    const { Cat_name } = body;
    // Validación de campos requeridos
    if (!Cat_name) {
      return NextResponse.json(
        {
          ok: false,
          data: null,
          message: "El nombre de la castegoría es obligatorio.",
        },
        { status: 400 }
      );
    }

    const existingCategory = await prisma.category.findUnique({
      where: { Cat_id: catId },
    });

    if (!existingCategory) {
      return NextResponse.json(
        { ok: false, data: null, message: "Categoría no encontrada." },
        { status: 404 }
      );
    }

    // TODO: Manejar el userId

    const updatedCategory = await prisma.category.update({
      where: { Cat_id: catId },
      data: {
        ...body,
        Cat_createdBy: 3,
      },
    });

    return NextResponse.json(
      {
        ok: true,
        data: updatedCategory,
        message: "Categoría actualizada.",
      },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : JSON.stringify(error);
    console.error("Error al actualizar la categoría:", errorMessage);

    return NextResponse.json(
      { ok: false, data: null, message: "Error en el servidor." },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    // const id = req.url.split("/").pop() Extracción directa de la url, tambien es posible.

    //TODO: HACER UNA VALIDACIÓN PARA VERIFICAR QUE LA CATEGORÍA NO ESTÉ ASICIADA A UN ITEM, SI LOESTÁ DEVOLVER UN MENSAJE QUE DIGA QIUE NO PUEDE ELIMINAR LA CATEG´RIA SI ESTA ASOCIADA A UN ITEM

    const url = new URL(req.url);
    const id = url.pathname.split("/").pop();

    if (!id) {
      return NextResponse.json(
        { ok: false, data: null, message: "ID no proporcionado." },
        { status: 400 }
      );
    }

    const catId = parseInt(id, 10);

    if (isNaN(catId)) {
      return NextResponse.json(
        { ok: false, data: null, message: "ID inválido." },
        { status: 400 }
      );
    }

    // TODO: Manejar el userId

    const deletedCategory = await prisma.category.delete({
      where: { Cat_id: catId },
    });

    return NextResponse.json(
      {
        ok: true,
        data: deletedCategory,
        message: "Categoría eliminada.",
      },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : JSON.stringify(error);
    console.error("Error al eliminar la categoría:", errorMessage);

    return NextResponse.json(
      { ok: false, data: null, message: "Error en el servidor." },
      { status: 500 }
    );
  }
}
