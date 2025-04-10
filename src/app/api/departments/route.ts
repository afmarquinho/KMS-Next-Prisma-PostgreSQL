import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const departments = await prisma.departments.findMany({
      orderBy: { Dep_name: "asc" },
    });

    return NextResponse.json(
      {
        ok: true,
        data: departments,
        message:
          departments.length === 0
            ? "No hay usuarios en la base de datos."
            : "Usuarios cargados exitosamente.",
      },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : JSON.stringify(error);
    console.error("No se pudo mostrar los departamentos: ", errorMessage);

    return NextResponse.json(
      {
        ok: false,
        data: null,
        message: "Error desconocido al obtener los departamentos",
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    console.log("Dentro de la petición")
    const body = await req.json();
    
    console.log("DESPUÉS DEL BODY")
    console.log("Nombre del departamento: ", body)
    const { Dep_name } = body;



    // Validación de campos requeridos
    if (!Dep_name) {
      return NextResponse.json(
        {
          ok: false,
          data: null,
          message: "El camppo del departamento es requerido.",
        },
        { status: 400 }
      );
    }

    // Validación de email
    const existingDept = await prisma.departments.findUnique({
      where: { Dep_name },
    });

    if (existingDept) {
      return NextResponse.json(
        {
          ok: false,
          data: null,
          message: "El departamento ya existeEmail ya existe.",
        },
        { status: 400 }
      );
    }

    const newDept = await prisma.departments.create({
      data: {
        Dep_name: Dep_name.trim(),
      },
    });

    return NextResponse.json(
      { ok: true, data: newDept, message: "Departamento creado exitosamente." },
      { status: 201 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : JSON.stringify(error);
    console.error("No se pudo crear el departamento: ", errorMessage);

    return NextResponse.json(
      {
        ok: false,
        data: null,
        message: "Error desconocido.",
      },
      { status: 500 }
    );
  }
}
