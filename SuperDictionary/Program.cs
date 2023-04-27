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
using Newtonsoft.Json;

namespace SuperDictionary
{
    internal class Program
    {
        private static string separator = new string('-', 144);
        private static int counter_written = 0, counter_loaded = 0;

        private static void countWordsInString(ref string[] words, ref Dictionary<string, int> singleDictionary)
        {
            char[] specialCharacters = { '!', '"', '#', '$', '%', '&', '\'', '(', ')', '*', '+', ',',
                '-', '.', '/', ':', ';', '<', '=', '>', '?', '@', '[', '\\', ']', '^', '_', '`', '{',
                '|', '}', '~', 'º', '¿', '¬', '¡', '«', '»', '¯', '´', '≡', '±', '‗', '÷', '¸', '°',
                '¨', '·', '‚', '„', '…', 'ˆ', '‰', '‹', '‘', '’', '“', '”', '•', '–', '—', '˜', '™',
                '›', '•', ' ', '\n', '\t' };

            // REPLACING SPECIAL CHARACTERS WITH BLANK CHARACTERS
            for (int w = 0; w < words.Length; w++)
            {
                foreach (char c in specialCharacters)
                {
                    words[w] = words[w].Replace(c.ToString(), "");
                }
            }

            // FORMING A NEW ARRAY BY REMOVING EMPTY ELEMENTS
            words = Array.FindAll(words, w => !string.IsNullOrEmpty(w));

            foreach (string word in words)
            {
                if (singleDictionary.ContainsKey(word)) singleDictionary[word]++;
                else singleDictionary.Add(word, 1);
            }
        }

        private static void writeDictionaryIntoTextFile(string fileName,
            Dictionary<string, int> singleDictionary)
        {
            try
            {
                if (!File.Exists(@$"output\{fileName}_dictionary.txt"))
                {
                    File.Create(@$"output\{fileName}_dictionary.txt").Close();

                    bool isFirstIteration = true;

                    foreach (KeyValuePair<string, int> entry in singleDictionary)
                    {
                        string entry_string = $"{entry.Key}: {entry.Value}\n";


                        // FIRST ITERATION WRITING
                        if (isFirstIteration)
                        {
                            string fileContent = File.ReadAllText(@$"output\{fileName}_dictionary.txt");

                            if (!string.IsNullOrEmpty(fileContent))
                            {
                                File.WriteAllText(@$"output\{fileName}_dictionary.txt", string.Empty);
                            }

                            isFirstIteration = false;
                        }


                        // SUCCESSIVE ITERATION WRITING
                        System.IO.File.AppendAllText(@$"output\{fileName}_dictionary.txt", entry_string);
                    }

                    Console.WriteLine("201: Dictionary written into a text file successfully.");
                }
            }
            catch (Exception error)
            {
                Console.WriteLine(error.Message);
            }
        }

        private static void writeDictionaryIntoJSONFile(string fileName,
            Dictionary<string, int> singleDictionary)
        {
            try
            {
                if (!File.Exists(@$"output\{fileName}_dictionary.json"))
                {
                    File.Create(@$"output\{fileName}_dictionary.json").Close();

                    bool isFirstIteration = true;

                    foreach (KeyValuePair<string, int> entry in singleDictionary)
                    {
                        string entry_string = $"\t\"{entry.Key}\": \"{entry.Value}\",\n";


                        // FIRST ITERATION WRITING
                        if (isFirstIteration)
                        {
                            string fileContent = File.ReadAllText(@$"output\{fileName}_dictionary.json");

                            if (!string.IsNullOrEmpty(fileContent))
                            {
                                File.WriteAllText(@$"output\{fileName}_dictionary.json", string.Empty);
                            }

                            File.WriteAllText(@$"output\{fileName}_dictionary.json", "{\n");

                            isFirstIteration = false;
                        }


                        // LAST ITERATION WRITING
                        if (entry.Equals(singleDictionary.Last()))
                        {
                            entry_string = $"\t\"{entry.Key}\": \"{entry.Value}\"\n";
                            System.IO.File.AppendAllText(@$"output\{fileName}_dictionary.json", entry_string);
                            System.IO.File.AppendAllText(@$"output\{fileName}_dictionary.json", "}");
                        }
                        // SUCCESSIVE ITERATION WRITING
                        else System.IO.File.AppendAllText(@$"output\{fileName}_dictionary.json", entry_string);
                    }

                    Console.WriteLine("201: Dictionary written into a JSON file successfully.");
                }
            }
            catch (Exception error)
            {
                Console.WriteLine(error.Message);
            }
        }


        private static void writeSuperWordCount(Dictionary<string, int>[] superDictionary_Array)
        {
            try
            {
                int totalItems = 0;
                int processedItems = 1;
                int progress = 0;
                bool isFirstIteration = true;
                Dictionary<string, int> superDictionary = new Dictionary<string, int>();

                if (!File.Exists(@$"output\SuperDictionary.json")) 
                    File.Create(@$"output\SuperDictionary.json").Close();


                // MERGING DICTIONARIES INTO SUPERDICTIONARY
                foreach (Dictionary<string, int> singleDictionary in superDictionary_Array)
                {
                    foreach (KeyValuePair<string, int> entry in singleDictionary)
                    {
                        if (superDictionary.ContainsKey(entry.Key)) superDictionary[entry.Key] += entry.Value;
                        else superDictionary.Add(entry.Key, entry.Value);
                    }
                }

                IOrderedEnumerable<KeyValuePair<string, int>> superDictionary_Enumerable =
                                superDictionary.OrderByDescending(x => x.Value).ThenBy(x => x.Key.Length).ThenBy(x => x.Key);
                superDictionary = superDictionary_Enumerable.ToDictionary(x => x.Key, x => x.Value);

                foreach (KeyValuePair<string, int> entry in superDictionary)
                {
                    totalItems++;
                }


                // WRITING SUPERDICTIONARY INTO A JSON FILE
                foreach (KeyValuePair<string, int> entry in superDictionary)
                {
                    // PROGRESS INDICATOR
                    progress = (int)((double)processedItems / totalItems * 100);
                    Console.SetCursorPosition(0, Console.CursorTop);
                    Console.Write("[{0}{1}] {2}% ({3}/{4})", new string('=', progress / 2),
                        new string(' ', 50 - (progress / 2)), progress, processedItems, totalItems);


                    string entry_string = $"\t\"{entry.Key}\": \"{entry.Value}\",\n";


                    // FIRST ITERATION WRITING
                    if (isFirstIteration)
                    {
                        string fileContent = File.ReadAllText(@$"output\SuperDictionary.json");

                        if (!string.IsNullOrEmpty(fileContent))
                        {
                            File.WriteAllText(@$"output\SuperDictionary.json", string.Empty);
                        }

                        File.WriteAllText(@$"output\SuperDictionary.json", "{\n");

                        isFirstIteration = false;
                    }


                    // LAST ITERATION WRITING
                    if (entry.Equals(superDictionary.Last()))
                    {
                        entry_string = $"\t\"{entry.Key}\": \"{entry.Value}\"\n";
                        System.IO.File.AppendAllText(@$"output\SuperDictionary.json", entry_string);
                        System.IO.File.AppendAllText(@$"output\SuperDictionary.json", "}");
                    }
                    // SUCCESSIVE ITERATION WRITING
                    else System.IO.File.AppendAllText(@$"output\SuperDictionary.json", entry_string);


                    processedItems++;
                }

                Console.WriteLine("\n201: Super dictionary written into a JSON file successfully.");
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
            Dictionary<string, int>[] superDictionary_Array = new Dictionary<string, int>[0];

            try
            {
                    // INPUT PREPARATION
                if (!Directory.Exists(@"input"))
                {
                    Directory.CreateDirectory(@"input");

                    Exception InputFolderNotFound =
                    new Exception("404: Input folder has initially not been found, but the folder has been created automatically." +
                    "\nFix: Navigate to bin/Debug/net6.0/input, place PDF files into the folder, and start the program again.");

                    throw InputFolderNotFound;
                }

                string[] files_input = Directory.GetFiles(@"input", "*.pdf");

                if (files_input.Length == 0)
                {
                    Exception InputFolderEmpty =
                    new Exception("411: Input folder has been found, but the folder is empty or does not contain any PDF files." +
                    "\nFix: Navigate to bin/Debug/net6.0/input, place PDF files into the folder, and start the program again.");

                    throw InputFolderEmpty;
                }


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
                        if (!File.Exists(@$"output\{fileName}_dictionary.json"))
                        {
                            string[] words = s.Split(" ");
                            for (int w = 0; w < words.Length; w++) words[w] = words[w].ToLower();

                            Dictionary<string, int> unorderedDictionary =
                                new Dictionary<string, int>(StringComparer.CurrentCultureIgnoreCase);
                            countWordsInString(ref words, ref unorderedDictionary);

                            IOrderedEnumerable<KeyValuePair<string, int>> orderedDictionary_Enumerable =
                                unorderedDictionary.OrderByDescending(x => x.Value).ThenBy(x => x.Key.Length).ThenBy(x => x.Key);
                            Dictionary<string, int> orderedDictionary = 
                                orderedDictionary_Enumerable.ToDictionary(x => x.Key, x => x.Value);
                            Array.Resize(ref superDictionary_Array, superDictionary_Array.Length + 1);
                            superDictionary_Array[superDictionary_Array.Length - 1] = orderedDictionary;
                            writeDictionaryIntoJSONFile(fileName, orderedDictionary);


                            counter_written++;

                            Console.WriteLine(Program.separator);
                        }
                        else
                        {
                            string json = File.ReadAllText($@"output/{fileName}_dictionary.json");
                            Dictionary<string, int> data = JsonConvert.DeserializeObject<Dictionary<string, int>>(json);
                            IOrderedEnumerable<KeyValuePair<string, int>> dictionary_orderedEnumerable =
                                data.OrderByDescending(x => x.Value).ThenBy(x => x.Key.Length).ThenBy(x => x.Key);
                            Dictionary<string, int> dictionary_ordered = 
                                dictionary_orderedEnumerable.ToDictionary(x => x.Key, x => x.Value);
                            Array.Resize(ref superDictionary_Array, superDictionary_Array.Length + 1);
                            superDictionary_Array[superDictionary_Array.Length - 1] = dictionary_ordered;

                            Console.WriteLine("100: Dictionary already written into a JSON file.");
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

                Console.WriteLine($"{counter_written} texts written.");
                Console.WriteLine($"{counter_loaded} texts loaded.");

                Console.WriteLine(Program.separator);

                writeSuperWordCount(superDictionary_Array);

                Console.WriteLine(Program.separator);
            }
            catch (Exception error)
            {
                Console.WriteLine(error.Message);
                Console.WriteLine(Program.separator);
            }
        }
    }
}