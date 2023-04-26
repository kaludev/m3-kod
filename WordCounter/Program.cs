using System;
using System.Collections.Generic;
using System.Diagnostics.Metrics;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Reflection.PortableExecutable;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using iTextSharp.text.pdf;
using iTextSharp.text.pdf.parser;

namespace PDFParser
{
    internal class Program
    {
        private static string separator = new string('-', 64);
        private static int counter_written = 0, counter_loaded = 0;

        private static void countWordsInString(ref string[] words, ref Dictionary<string, int> wordCount)
        {
            char[] specialCharacters = { '!', '"', '#', '$', '%', '&', '\'', '(', ')', '*', '+', ',',
                '-', '.', '/', ':', ';', '<', '=', '>', '?', '@', '[', '\\', ']', '^', '_', '`', '{',
                '|', '}', '~', 'º', '¿', '¬', '¡', '«', '»', '¯', '´', '≡', '±', '‗', '÷', '¸', '°',
                '¨', '·', '‚', '„', '…', 'ˆ', '‰', '‹', '‘', '’', '“', '”', '•', '–', '—', '˜', '™',
                '›', '•', ' ', '\n', '\t' };

            for (int w = 0; w < words.Length; w++)
            {
                foreach (char c in specialCharacters)
                {
                    words[w] = words[w].Replace(c.ToString(), "");
                }
            }

            words = Array.FindAll(words, w => !string.IsNullOrEmpty(w));

            foreach (string word in words)
            {
                if (wordCount.ContainsKey(word)) wordCount[word]++;
                else wordCount.Add(word, 1);
            }
        }

        private static void writeWordCountIntoTextFile(string fileName,
            IOrderedEnumerable<KeyValuePair<string, int>> wordCount_ordered)
        {
            try
            {
                if (!File.Exists(@$"output\{fileName}_wordCount.txt"))
                {
                    File.Create(@$"output\{fileName}_wordCount.txt").Close();

                    bool isFirstIteration = true;

                    foreach (KeyValuePair<string, int> entry in wordCount_ordered)
                    {
                        string entry_string = $"{entry.Key}: {entry.Value}\n";

                        // FIRST ITERATION WRITING
                        if (isFirstIteration)
                        {
                            string fileContent = File.ReadAllText(@$"output\{fileName}_wordCount.txt");

                            if (!string.IsNullOrEmpty(fileContent))
                            {
                                File.WriteAllText(@$"output\{fileName}_wordCount.txt", string.Empty);
                            }

                            isFirstIteration = false;
                        }

                        // SUCCESSIVE ITERATION WRITING
                        System.IO.File.AppendAllText(@$"output\{fileName}_wordCount.txt", entry_string);
                    }

                    Console.WriteLine("201: Word count written into a text file successfully.");
                }
            }
            catch (Exception error)
            {
                Console.WriteLine(error.Message);
            }
        }

        private static void writeWordCountIntoJSONFile(string fileName,
            IOrderedEnumerable<KeyValuePair<string, int>> wordCount_ordered)
        {
            try
            {
                if (!File.Exists(@$"output\{fileName}_wordCount.json"))
                {
                    File.Create(@$"output\{fileName}_wordCount.json").Close();

                    bool isFirstIteration = true;

                    foreach (KeyValuePair<string, int> entry in wordCount_ordered)
                    {
                        string entry_string = $"\t\"{entry.Key}\": \"{entry.Value}\",\n";

                        // FIRST ITERATION WRITING
                        if (isFirstIteration)
                        {
                            string fileContent = File.ReadAllText(@$"output\{fileName}_wordCount.json");

                            if (!string.IsNullOrEmpty(fileContent))
                            {
                                File.WriteAllText(@$"output\{fileName}_wordCount.json", string.Empty);
                            }

                            File.WriteAllText(@$"output\{fileName}_wordCount.json", "{\n");

                            isFirstIteration = false;
                        }

                        // LAST ITERATION WRITING
                        if (entry.Equals(wordCount_ordered.Last()))
                        {
                            entry_string = $"\t\"{entry.Key}\": \"{entry.Value}\"\n";
                            System.IO.File.AppendAllText(@$"output\{fileName}_wordCount.json", entry_string);
                            System.IO.File.AppendAllText(@$"output\{fileName}_wordCount.json", "}");
                        }
                        // SUCCESSIVE ITERATION WRITING
                        else System.IO.File.AppendAllText(@$"output\{fileName}_wordCount.json", entry_string);
                    }

                    Console.WriteLine("201: Word count written into a JSON file successfully.");
                }
            }
            catch (Exception error)
            {
                Console.WriteLine(error.Message);
            }
        }


        private static void Main(string[] args)
        {
            Console.OutputEncoding = System.Text.Encoding.UTF8;
            StringBuilder sb = new StringBuilder();
            string[] files_input = Directory.GetFiles(@"input", "*.pdf");


            // OUTPUT PREPARATION
            if (!Directory.Exists(@"output")) Directory.CreateDirectory(@"output");


            // INPUT FILE ITERATIONS
            foreach (string file_input in files_input)
            {
                string fileName = System.IO.Path.GetFileNameWithoutExtension(file_input);
                fileName = System.IO.Path.GetFileName(fileName);

                using (PdfReader reader = new PdfReader(file_input))
                {
                    sb.Clear();
                    for (int page = 1; page <= reader.NumberOfPages; page++)
                    {
                        ITextExtractionStrategy strategy = new SimpleTextExtractionStrategy();
                        string text = PdfTextExtractor.GetTextFromPage(reader, page, strategy);
                        text = Encoding.UTF8.GetString(ASCIIEncoding.Convert(Encoding.Default,
                            Encoding.UTF8, Encoding.Default.GetBytes(text)));
                        sb.Append(text);
                    }
                }

                string title = fileName.ToUpper();
                Console.WriteLine(title);
                string s = sb.ToString();

                try
                {
                    if (!File.Exists(@$"output\{fileName}.txt"))
                    {
                        File.Create(@$"output\{fileName}.txt").Close();

                        System.IO.File.WriteAllText(@$"output\{fileName}.txt", s);

                        Console.WriteLine("201: Text written into a text file successfully.");


                        // WORD COUNT

                        string[] words = s.Split(" ");
                        for (int w = 0; w < words.Length; w++) words[w] = words[w].ToLower();

                        Dictionary<string, int> wordCount =
                            new Dictionary<string, int>(StringComparer.CurrentCultureIgnoreCase);
                        countWordsInString(ref words, ref wordCount);

                        IOrderedEnumerable<KeyValuePair<string, int>> wordCount_ordered =
                            wordCount.OrderByDescending(x => x.Value).ThenBy(x => x.Key.Length).ThenBy(x => x.Key);
                        writeWordCountIntoTextFile(fileName, wordCount_ordered);
                        writeWordCountIntoJSONFile(fileName, wordCount_ordered);


                        counter_written += 3;

                        Console.WriteLine(Program.separator);
                    }
                    else
                    {
                        Console.WriteLine("100: Text already written into a text file.");
                        Console.WriteLine(Program.separator);
                        counter_loaded++;
                        continue;
                    }
                }
                catch (Exception error)
                {
                    Console.WriteLine(error.Message);
                }
            }

            if (counter_written > 0 && counter_loaded > 0)
                Console.WriteLine($"{counter_written} texts written & {counter_loaded} texts loaded.");
            else if (counter_loaded == 0) Console.WriteLine($"{counter_written} texts written.");
            else if (counter_written == 0) Console.WriteLine($"{counter_loaded} texts loaded.");

            Console.WriteLine(Program.separator);
            Console.ReadLine();
        }
    }
}