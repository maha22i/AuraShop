import emailjs from "@emailjs/browser";

interface OrderEmailParams {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerDistrict: string;
  customerComment: string;
  orderItems: string;
  orderTotal: string;
}

interface ContactEmailParams {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export const sendOrderEmail = async (params: OrderEmailParams) => {
  try {
    // Formater les articles pour l'email
    const formattedItems = params.orderItems
      .split("\n")
      .filter((line) => line.trim() !== "")
      .join("\n");

    // Envoyer l'email
    const emailResponse = await emailjs.send(
      "service_yrt97yo",
      "template_1n04l3e",
      {
        to_email: "chehem21@gmail.com",
        customer_name: params.customerName,
        customer_email: params.customerEmail,
        customer_phone: params.customerPhone,
        customer_district: params.customerDistrict,
        customer_comment: params.customerComment || "Aucun commentaire",
        order_items: formattedItems,
        order_total: params.orderTotal,
      },
      "FAPYgCzCX6t9y-bXC"
    );

    return emailResponse;
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error);
    throw error;
  }
};

export const sendContactEmail = async (params: ContactEmailParams) => {
  try {
    const response = await emailjs.send(
      "service_yrt97yo",
      "template_cpvpmmn",
      {
        from_name: params.name,
        from_email: params.email,
        phone: params.phone,
        message: params.message,
        to_email: "chehem21@gmail.com",
      },
      "FAPYgCzCX6t9y-bXC"
    );

    return response;
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email de contact:", error);
    throw error;
  }
};