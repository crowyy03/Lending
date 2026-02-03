import type { VercelRequest, VercelResponse } from '@vercel/node';

interface FormPayload {
  address?: string;
  phone?: string;
  contactMethod?: 'call' | 'whatsapp';
  coverage?: string;
  homeHeight?: string;
  mainUse?: string;
  notes?: string;
  email?: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const subdomain = process.env.AMOCRM_SUBDOMAIN;
  const token = process.env.AMOCRM_ACCESS_TOKEN;
  const pipelineId = process.env.AMOCRM_PIPELINE_ID;
  const statusId = process.env.AMOCRM_STATUS_ID;
  const fieldLeadNotes = process.env.AMOCRM_FIELD_LEAD_NOTES; // ID поля «Примечание» у сделки (опционально)

  if (!subdomain || !token) {
    return res.status(500).json({
      error: 'AmoCRM not configured',
      detail: 'Set AMOCRM_SUBDOMAIN and AMOCRM_ACCESS_TOKEN in environment',
    });
  }

  let body: FormPayload = {};
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
  } catch {
    return res.status(400).json({ error: 'Invalid JSON body' });
  }

  const contactMethodLabel = body.contactMethod === 'call' ? 'Звонок' : 'WhatsApp';
  const notesText = [
    `Адрес: ${body.address || '—'}`,
    `Способ связи: ${contactMethodLabel}`,
    `Покрытие: ${body.coverage || '—'}`,
    `Высота дома: ${body.homeHeight || '—'}`,
    `Использование: ${body.mainUse || '—'}`,
    body.notes ? `Заметки: ${body.notes}` : null,
  ]
    .filter(Boolean)
    .join('\n');

  const leadName = body.address
    ? `AlexPRO Lights — ${String(body.address).slice(0, 80)}`
    : `Заявка с лендинга — ${body.email || body.phone || 'без контакта'}`;

  const payload = [
    {
      name: leadName,
      price: 0,
      created_by: 0,
      ...(pipelineId && { pipeline_id: Number(pipelineId) }),
      ...(statusId && { status_id: Number(statusId) }),
      ...(fieldLeadNotes && notesText && {
        custom_fields_values: [
          {
            field_id: Number(fieldLeadNotes),
            values: [{ value: notesText }],
          },
        ],
      }),
      _embedded: {
        contacts: [
          {
            first_name: 'Клиент с лендинга',
            custom_fields_values: [
              {
                field_code: 'EMAIL',
                values: [{ enum_code: 'WORK', value: body.email || '' }],
              },
              {
                field_code: 'PHONE',
                values: [{ enum_code: 'WORK', value: body.phone || '' }],
              },
            ],
          },
        ],
      },
    },
  ];

  const url = `https://${subdomain}.amocrm.ru/api/v4/leads/complex`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    return res.status(response.status).json({
      error: 'AmoCRM API error',
      status: response.status,
      detail: data,
    });
  }

  return res.status(200).json({ success: true, data });
}
